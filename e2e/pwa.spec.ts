import { expect, test } from '@playwright/test';

/** D52: the service worker caches no results; one manifest per locale. */

for (const lang of ['tr', 'en'] as const) {
  test(`/${lang} links its own manifest with a matching start_url`, async ({ request }) => {
    const page = await (await request.get(`/${lang}`)).text();
    expect(page).toContain(`<link rel="manifest" href="/${lang}/manifest.webmanifest"`);

    const response = await request.get(`/${lang}/manifest.webmanifest`);
    expect(response.headers()['content-type']).toContain('application/manifest+json');
    const manifest = await response.json();
    expect(manifest).toMatchObject({ lang, start_url: `/${lang}`, id: `/${lang}` });
  });
}

test('service worker caches only offline.html, even after a search', async ({ page }) => {
  await page.goto('/tr');
  await page.evaluate(() => navigator.serviceWorker.ready);
  // Reload so the worker controls the page and sees the search request.
  await page.reload();
  expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  // First results are rendered into the page; run a real search through the worker.
  const status = await page.evaluate(async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ institution: 'Allianz', district: 'Balçova' }),
    });
    return response.status;
  });
  expect(status).toBe(200);

  const cached = await page.evaluate(async () => {
    const urls: string[] = [];
    for (const name of await caches.keys()) {
      for (const request of await (await caches.open(name)).keys()) {
        urls.push(new URL(request.url).pathname);
      }
    }
    return urls;
  });
  expect(cached).toEqual(['/offline.html']);
});

test('offline navigation falls back to offline.html', async ({ page, context }) => {
  await page.goto('/tr');
  await page.evaluate(() => navigator.serviceWorker.ready);
  // The worker claims open clients on activate; reload so it controls this page.
  await page.reload();
  expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  await context.setOffline(true);
  await page.reload();
  await expect(page).toHaveTitle('MEDPUSULA · Çevrimdışı');
});
