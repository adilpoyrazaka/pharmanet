import { facilities } from './demo-data';

export type Method = 'chamber' | 'field' | 'phone' | 'self_claimed' | 'scraped';

export type Agreement = {
  institution: string;
  verification_method: Method;
  verified_at: string;
};

export type Facility = {
  id: string;
  facility_type: 'pharmacy';
  status: 'active' | 'temporarily_closed' | 'closed';
  name: string;
  area: string;
  address: string;
  district: string;
  region: string;
  lat: number;
  lon: number;
  open: boolean;
  duty: boolean;
  whatsapp_active: boolean;
  agreements: Agreement[];
  demo: true;
};

/** D49: freshness is evaluated per agreement, not per facility. */
export type ResolvedAgreement = Agreement & { fresh: boolean };

export type SearchInput = {
  institution: string;
  district: string;
  query?: string;
  onlyOpen?: boolean;
  freshOnly?: boolean;
  dutyOnly?: boolean;
  sort?: 'recommended' | 'name';
  location?: { latitude: number; longitude: number };
};

export type Result = Omit<Facility, 'agreements'> & {
  agreements: ResolvedAgreement[];
  verified_at: string;
  verification_method: Method;
  fresh: boolean;
  distance?: number;
  /** D50: minutes as a range, never a single figure. */
  walking?: { min: number; max: number };
};

const FRESHNESS_DAYS = 60;

/** D50: straight-line distance underestimates real walking routes. */
const DETOUR_MIN = 1.2;
const DETOUR_MAX = 1.5;
const WALKING_KMH = 4.0;

export function normalize(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');
}

const DAY_MS = 86_400_000;

/** Today's calendar date in Istanbul, as YYYY-MM-DD. */
function istanbulDate(now: number) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/**
 * D17: fresh when 0–60 Istanbul calendar days have passed since `verified_at`.
 * No clock arithmetic; future or malformed dates are never fresh.
 */
export function isFresh(date: string, now = Date.now()) {
  const days =
    (Date.parse(`${istanbulDate(now)}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) /
    DAY_MS;
  return days >= 0 && days <= FRESHNESS_DAYS;
}

export function distanceKm(
  from: { latitude: number; longitude: number },
  to: Facility,
) {
  const rad = Math.PI / 180;
  const dLat = (to.lat - from.latitude) * rad;
  const dLon = (to.lon - from.longitude) * rad;
  const n =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(from.latitude * rad) *
      Math.cos(to.lat * rad) *
      Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(n), Math.sqrt(1 - n));
}

export function walkingRange(km: number) {
  const toMinutes = (detour: number) =>
    Math.max(1, Math.round(((km * detour) / WALKING_KMH) * 60));
  return { min: toMinutes(DETOUR_MIN), max: toMinutes(DETOUR_MAX) };
}

/** D50: show a single figure only when both ends round to the same minute. */
export function formatWalking(range: { min: number; max: number }) {
  return range.min === range.max ? `${range.min}` : `${range.min}–${range.max}`;
}

export function searchPharmacies(input: SearchInput, now = Date.now()): Result[] {
  return facilities
    .filter(
      (p) =>
        p.facility_type === 'pharmacy' &&
        // Facility status is a separate pre-filter; closure is not `open`'s job.
        p.status === 'active' &&
        // District always filters. Location only adds distance and ordering.
        p.district === input.district &&
        (!input.onlyOpen || p.open) &&
        (!input.dutyOnly || p.duty) &&
        normalize(`${p.name} ${p.area}`).includes(normalize(input.query || '')),
    )
    .flatMap<Result>((p) => {
      const visible = p.agreements.filter(
        (a) => a.verification_method !== 'scraped',
      );
      const matched = visible.find((a) => a.institution === input.institution);
      if (!matched) return [];

      const fresh = isFresh(matched.verified_at, now);
      if (input.freshOnly && !fresh) return [];

      const distance = input.location ? distanceKm(input.location, p) : undefined;

      return [
        {
          ...p,
          agreements: visible.map((a) => ({
            ...a,
            fresh: isFresh(a.verified_at, now),
          })),
          verified_at: matched.verified_at,
          verification_method: matched.verification_method,
          fresh,
          distance,
          walking: distance === undefined ? undefined : walkingRange(distance),
        },
      ];
    })
    .sort((a, b) =>
      input.sort === 'name'
        ? a.name.localeCompare(b.name, 'tr')
        : Number(b.open) - Number(a.open) || (a.distance ?? 0) - (b.distance ?? 0),
    );
}
