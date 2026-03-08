import { test, expect } from '@playwright/test';

test('Google search works', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
  await page.locator('textarea[name="q"]').fill('Playwright testing');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/search/);
});