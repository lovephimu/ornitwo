import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  page.on('response', (response) => {
    console.log(`Response URL: ${response.url()}`);
    console.log(`Response status: ${response.status()}`);
  });

  page.on('requestfailed', (request) => {
    console.log(`Failed to load URL: ${request.url()}`);
    console.log(`Failure error text: ${request.failure()?.errorText}`);
  });

  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', {
      name: 'ornitwo',
    }),
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'Report' })).toBeVisible();

  await page.getByRole('button', { name: 'Report' }).click();

  await expect(page).toHaveURL('http://localhost:3000/report/login');
});
