import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test('renders hero, both audience buttons, and language toggle in EN', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /kid/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /parent/i }).first()).toBeVisible();
    await expect(page.locator('select[aria-label="Language"]')).toBeVisible();
  });

  test('switches to Arabic and applies RTL direction', async ({ page }) => {
    await page.goto('/en');
    await page.locator('select[aria-label="Language"]').selectOption('ar');
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('switches to French', async ({ page }) => {
    await page.goto('/en');
    await page.locator('select[aria-label="Language"]').selectOption('fr');
    await expect(page).toHaveURL(/\/fr$/);
  });

  test('switches to Indonesian', async ({ page }) => {
    await page.goto('/en');
    await page.locator('select[aria-label="Language"]').selectOption('id');
    await expect(page).toHaveURL(/\/id$/);
  });
});

test.describe('Map page', () => {
  test('shows Lumi and zone grid', async ({ page }) => {
    await page.goto('/en/map');
    await expect(page.getByRole('heading', { name: /NoorQuest Garden/i })).toBeVisible();
    await expect(page.getByText(/Market/i).first()).toBeVisible();
    await expect(page.getByText(/Oasis/i).first()).toBeVisible();
  });
});

test.describe('Halal Scanner', () => {
  test('renders shelf, scanner zone, and progress panel', async ({ page }) => {
    await page.goto('/en/market');
    await expect(page.getByRole('heading', { name: /Halal Scanner/i })).toBeVisible();
    await expect(page.getByText(/Progress/i)).toBeVisible();
  });
});

test.describe('SEO endpoints', () => {
  test('sitemap.xml is served', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<urlset');
  });

  test('robots.txt is served', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('User-Agent');
  });

  test('manifest.webmanifest is served with PWA fields', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toContain('NoorQuest');
    expect(body.icons).toBeTruthy();
  });
});
