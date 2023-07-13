import { expect, test } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('http://localhost:3000/report/login');

  await expect(
    page.getByRole('heading', {
      name: 'ornitwo',
    }),
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await page.getByLabel('Username:').fill('cheekychipper');

  await page.getByLabel('Password:').fill('cheeky');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL('http://localhost:3000/report');

  // await expect(page).toHaveURL('http://localhost:3000/report/login');
});
