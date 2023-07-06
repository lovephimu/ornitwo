import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', {
      name: 'ornitwo',
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'report icon Report' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'report icon Report' }).click();

  await expect(page).toHaveURL('http://localhost:3000/report/login');
});
