import { expect, test } from '@playwright/test';

/** D51: locale paths, permanent root redirect, no language detection. */

const html = async (request: import('@playwright/test').APIRequestContext, path: string) => {
  const response = await request.get(path);
  expect(response.status()).toBe(200);
  return response.text();
};

test('root permanently redirects to /tr', async ({ request }) => {
  const response = await request.get('/', { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers()['location']).toBe('/tr');
});

test('root ignores the browser language', async ({ request }) => {
  const response = await request.get('/', {
    maxRedirects: 0,
    headers: { 'Accept-Language': 'en-US,en;q=0.9' },
  });
  expect(response.headers()['location']).toBe('/tr');
});

test('trailing slash redirects to the slashless URL', async ({ request }) => {
  const response = await request.get('/tr/', { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers()['location']).toBe('/tr');
});

test('unknown locale prefixes return 404', async ({ request }) => {
  for (const path of ['/de', '/xx', '/TR']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(404);
  }
});

for (const lang of ['tr', 'en'] as const) {
  test(`/${lang} sets html lang on the server and a self canonical`, async ({ request }) => {
    const page = await html(request, `/${lang}`);
    expect(page).toMatch(new RegExp(`<html[^>]*\\slang="${lang}"`));
    expect(page).toContain(`<link rel="canonical" href="https://medpusula.com/${lang}"/>`);
  });
}

test('/tr is indexable', async ({ request }) => {
  const page = await html(request, '/tr');
  expect(page).not.toMatch(/<meta name="robots"/);
});

test('/en is noindex but keeps links followable', async ({ request }) => {
  const page = await html(request, '/en');
  expect(page).toContain('<meta name="robots" content="noindex, follow"/>');
});

test('no hreflang is declared while /en is noindex', async ({ request }) => {
  for (const lang of ['tr', 'en']) {
    expect(await html(request, `/${lang}`), `/${lang}`).not.toContain('hreflang');
  }
});
