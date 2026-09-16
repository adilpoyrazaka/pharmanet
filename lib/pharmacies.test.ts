import { describe, expect, it } from 'vitest';
import {
  formatWalking,
  isFresh,
  searchPharmacies,
  walkingRange,
  type SearchInput,
} from './pharmacies';

/** Build an instant from an Istanbul wall-clock time (UTC+3, no DST). */
const istanbul = (dateTime: string) => Date.parse(`${dateTime}+03:00`);

describe('isFresh — D17 calendar-day threshold', () => {
  it('treats a same-day verification as fresh at any hour', () => {
    expect(isFresh('2026-09-16', istanbul('2026-09-16T00:30:00'))).toBe(true);
    expect(isFresh('2026-09-16', istanbul('2026-09-16T23:30:00'))).toBe(true);
  });

  it('keeps day 60 fresh and makes day 61 stale', () => {
    const noon = istanbul('2026-09-16T12:00:00');
    expect(isFresh('2026-07-18', noon)).toBe(true); // 60 days
    expect(isFresh('2026-07-17', noon)).toBe(false); // 61 days
  });

  it('counts days by the Istanbul calendar, not UTC', () => {
    // 00:30 in Istanbul is still the previous day in UTC.
    const justAfterMidnight = istanbul('2026-09-17T00:30:00');
    expect(isFresh('2026-07-19', justAfterMidnight)).toBe(true); // 60 days
    expect(isFresh('2026-07-18', justAfterMidnight)).toBe(false); // 61 days
  });

  it('never treats a future or malformed date as fresh', () => {
    const now = istanbul('2026-09-16T12:00:00');
    expect(isFresh('2026-09-17', now)).toBe(false);
    expect(isFresh('not-a-date', now)).toBe(false);
  });
});

describe('searchPharmacies — demo data invariants', () => {
  // Demo dates are fixed; these checks start failing once they age past
  // the threshold, which is the signal that demo dates must become relative.
  const now = Date.now();
  const balcova = (extra: Partial<SearchInput> = {}): SearchInput => ({
    institution: 'Allianz',
    district: 'Balçova',
    ...extra,
  });
  const byId = (id: string, input = balcova()) =>
    searchPharmacies(input, now).find((r) => r.id === id);

  it('D49: evaluates freshness per agreement, not per facility', () => {
    const kiyi = byId('demo-1');
    expect(kiyi?.fresh).toBe(true);
    const tags = Object.fromEntries(kiyi!.agreements.map((a) => [a.institution, a.fresh]));
    expect(tags).toMatchObject({ Allianz: true, AXA: false });
  });

  it('D49: a stale searched agreement stays visible, marked stale', () => {
    const mavi = byId('demo-3');
    expect(mavi).toBeDefined();
    expect(mavi!.fresh).toBe(false);
    expect(mavi!.agreements.find((a) => a.institution === 'AXA')?.fresh).toBe(true);
  });

  it('D17: freshOnly drops results whose searched agreement is stale', () => {
    expect(byId('demo-3', balcova({ freshOnly: true }))).toBeUndefined();
  });

  it('D38: a scraped agreement never appears as a contracted result', () => {
    expect(byId('demo-9')).toBeUndefined();
    for (const r of searchPharmacies(balcova(), now)) {
      expect(r.agreements.every((a) => a.verification_method !== 'scraped')).toBe(true);
    }
  });

  it('§14: a facility that is not active is filtered before anything else', () => {
    expect(byId('demo-10')).toBeUndefined();
  });

  it('D15: every result is explicitly a pharmacy', () => {
    for (const r of searchPharmacies(balcova(), now)) {
      expect(r.facility_type).toBe('pharmacy');
    }
  });
});

describe('walking time — D50 range', () => {
  it('applies the 1.2 / 1.5 detour factors at 4 km/h', () => {
    expect(walkingRange(1)).toEqual({ min: 18, max: 23 });
  });

  it('never shows less than one minute', () => {
    expect(walkingRange(0)).toEqual({ min: 1, max: 1 });
  });

  it('shows a range, or a single figure when both ends are equal', () => {
    expect(formatWalking({ min: 11, max: 13 })).toBe('11–13');
    expect(formatWalking({ min: 1, max: 1 })).toBe('1');
  });
});
