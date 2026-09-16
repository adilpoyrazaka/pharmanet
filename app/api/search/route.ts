import { z } from 'zod';
import { searchPharmacies } from '@/lib/pharmacies';
import { districts, institutions } from '@/lib/demo-data';

const inputSchema = z
  .object({
    institution: z.string().refine((x) => institutions.includes(x)),
    district: z.string().refine((x) => districts.includes(x)),
    query: z.string().max(100).optional(),
    onlyOpen: z.boolean().optional(),
    freshOnly: z.boolean().optional(),
    dutyOnly: z.boolean().optional(),
    sort: z.enum(['recommended', 'name']).optional(),
    // D41: coordinates arrive in the body only. Never stored, never logged.
    location: z
      .object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      })
      .strict()
      .optional(),
  })
  .strict();

export async function POST(request: Request) {
  const headers = {
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
  };

  try {
    const body = await request.text();
    if (body.length > 4096) {
      return Response.json({ error: 'İstek çok büyük.' }, { status: 413, headers });
    }

    const parsed = inputSchema.safeParse(JSON.parse(body));
    if (!parsed.success) {
      return Response.json(
        { error: 'Arama bilgileri geçersiz.' },
        { status: 400, headers },
      );
    }

    return Response.json(
      { demo: true, results: searchPharmacies(parsed.data) },
      { headers },
    );
  } catch {
    return Response.json({ error: 'İstek okunamadı.' }, { status: 400, headers });
  }
}

