// rogers.spec.ts
// My first Playwright test — Manisha Wadhwa
// Week 3 Day 1

import { test, expect } from '@playwright/test';

test('Rogers homepage loads', async ({ page }) => {
  // Navigate to Rogers website
  await page.goto('https://www.rogers.com/');

  // Check page title contains Rogers
  await expect(page).toHaveTitle(/Rogers/);

  // Print success message
  console.log('✅ Rogers homepage loaded successfully!');
});

test('Rogers page has navigation', async ({ page }) => {
  // Navigate to Rogers website
  await page.goto('https://www.rogers.com/');

  // Check page is visible
  await expect(page).toHaveURL(/rogers.com/);

  console.log('✅ Rogers URL verified!');
});