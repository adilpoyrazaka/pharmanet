import { expect, test } from '@playwright/test';

/** D41: coordinates travel in the request body only and are never cached. */

const valid = { institution: 'Allianz', district: 'Balçova' };

test('rejects GET, so coordinates cannot arrive in a query string', async ({ request }) => {
  const response = await request.get('/api/search?latitude=38.39&longitude=27.05');
  expect(response.status()).toBe(405);
});

test('rejects unknown fields in the body', async ({ request }) => {
  const response = await request.post('/api/search', { data: { ...valid, userId: 'x' } });
  expect(response.status()).toBe(400);
});

test('rejects extra fields inside location', async ({ request }) => {
  const response = await request.post('/api/search', {
    data: { ...valid, location: { latitude: 38.39, longitude: 27.05, accuracy: 5 } },
  });
  expect(response.status()).toBe(400);
});

test('responses are never cached and send no referrer', async ({ request }) => {
  const response = await request.post('/api/search', { data: valid });
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toContain('no-store');
  expect(response.headers()['referrer-policy']).toBe('no-referrer');
});

test('does not echo the coordinates back', async ({ request }) => {
  const response = await request.post('/api/search', {
    data: { ...valid, location: { latitude: 38.391234, longitude: 27.051234 } },
  });
  const body = await response.text();
  expect(body).not.toContain('38.391234');
  expect(body).not.toContain('27.051234');
});
