// locators.spec.ts
// Week 3 Day 2 — Learning Playwright Locators
// Manisha Wadhwa

import { test, expect } from '@playwright/test';

// ── TEST 1: getByRole ──────────────────────────────
test('find elements by role', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Find heading by role
  const heading = page.getByRole('heading', { name: 'Wikipedia' });
  await expect(heading).toBeVisible();
  console.log('✅ Found heading by role');

  // Find link by role
  const englishLink = page.getByRole('link', { name: 'English' });
  await expect(englishLink).toBeVisible();
  console.log('✅ Found English link by role');
});

// ── TEST 2: getByPlaceholder ───────────────────────
test('find input by placeholder', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Find search box by placeholder text
  const searchBox = page.locator('input#searchInput');
 await expect(searchBox).toBeVisible();
 await searchBox.fill('Playwright automation');
 console.log('✅ Found and filled search box');
  await expect(searchBox).toBeVisible();

  // Type in the search box!
  await searchBox.fill('Playwright automation');
  console.log('✅ Found and filled search box');
});

// ── TEST 3: getByText ──────────────────────────────
test('find elements by text', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Find element by its text content
  const englishText = page.getByText('The Free Encyclopedia', { exact: true }).first();
  await expect(englishText).toBeAttached();
  console.log('✅ Found text element');
  
});

// ── TEST 4: locator with CSS ───────────────────────
test('find elements by CSS selector', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Find by CSS selector
  const searchInput = page.locator('input#searchInput');
  await expect(searchInput).toBeVisible();

  // Type and verify
  await searchInput.fill('QA Automation');
  const value = await searchInput.inputValue();
  expect(value).toBe('QA Automation');
  console.log(`✅ CSS locator found input — value: ${value}`);
});