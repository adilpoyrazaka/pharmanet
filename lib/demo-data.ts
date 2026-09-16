import type { Facility, Method } from './pharmacies';

export const institutions = [
  'Allianz',
  'Türkiye Sigorta',
  'AXA',
  'Anadolu Sigorta',
  'İş Bankası Emekli Sandığı',
];

export const districts = ['Balçova', 'Konak', 'Karabağlar'];

const make = (
  id: number,
  name: string,
  area: string,
  district: string,
  region: string,
  lat: number,
  lon: number,
  open: boolean,
  duty: boolean,
  names: string[],
  method: Method = 'field',
  date = '2026-09-10',
): Facility => ({
  id: `demo-${id}`,
  facility_type: 'pharmacy',
  status: 'active',
  name,
  area,
  address: `Örnek Sokak No: ${id * 8 + 4}/A`,
  district,
  region,
  lat,
  lon,
  open,
  duty,
  whatsapp_active: false,
  agreements: names.map((institution) => ({
    institution,
    verification_method: method,
    verified_at: date,
  })),
  demo: true,
});

export const facilities: Facility[] = [
   {
    ...make(1, 'Kıyı Eczanesi', 'Bahçelerarası Mahallesi', 'Balçova', 'Balçova-1', 38.391, 27.048, true, false, []),
    // D49 check: searched institution fresh, another stale.
    agreements: [
      { institution: 'Allianz', verification_method: 'field', verified_at: '2026-09-10' },
      { institution: 'Türkiye Sigorta', verification_method: 'phone', verified_at: '2026-09-08' },
      { institution: 'AXA', verification_method: 'phone', verified_at: '2026-05-20' },
    ],
  },
  make(2, 'Defne Eczanesi', 'Eğitim Mahallesi', 'Balçova', 'Balçova-1', 38.390, 27.055, true, true, ['Allianz', 'Anadolu Sigorta'], 'phone', '2026-09-08'),
    {
    ...make(3, 'Mavi Eczanesi', 'Teleferik Mahallesi', 'Balçova', 'Balçova-2', 38.385, 27.060, true, false, []),
    // D49 check: searched institution stale, another fresh.
    agreements: [
      { institution: 'Allianz', verification_method: 'phone', verified_at: '2026-06-15' },
      { institution: 'AXA', verification_method: 'field', verified_at: '2026-09-06' },
    ],
  },
  make(4, 'Çınar Eczanesi', 'Korutürk Mahallesi', 'Balçova', 'Balçova-2', 38.382, 27.045, false, false, ['Allianz', 'Türkiye Sigorta'], 'phone', '2026-06-02'),
  make(5, 'Ada Eczanesi', 'Mithatpaşa Mahallesi', 'Konak', 'Mithatpaşa', 38.410, 27.100, true, true, ['Allianz', 'AXA', 'İş Bankası Emekli Sandığı']),
  make(6, 'Işık Eczanesi', 'Güzelyalı Mahallesi', 'Konak', 'Mithatpaşa', 38.400, 27.085, true, false, ['Türkiye Sigorta', 'Anadolu Sigorta'], 'phone'),
  make(7, 'Filiz Eczanesi', 'Hatay Mahallesi', 'Karabağlar', 'Hatay', 38.393, 27.113, true, false, ['Allianz', 'Türkiye Sigorta']),
  make(8, 'Duru Eczanesi', 'Bahçelievler Mahallesi', 'Karabağlar', 'Üçyol', 38.397, 27.125, true, true, ['AXA', 'Anadolu Sigorta']),
  make(9, 'Ufuk Eczanesi', 'Eğitim Mahallesi', 'Balçova', 'Balçova-1', 38.389, 27.056, true, false, ['Allianz'], 'scraped'),
  {
    ...make(10, 'Kapalı Örnek Eczane', 'Eğitim Mahallesi', 'Balçova', 'Balçova-1', 38.387, 27.053, false, true, ['Allianz']),
    status: 'temporarily_closed',
  },
];
