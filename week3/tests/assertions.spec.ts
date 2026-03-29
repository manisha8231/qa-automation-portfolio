// tests/assertions.spec.ts
// Week 3 Day 4 — Assertions + Screenshots
// Manisha Wadhwa

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';

// ── TEST 1: Title Assertions ───────────────────────
test('verify Rogers page title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Assert title contains Rogers
    await expect(page).toHaveTitle(/Rogers/);
    console.log('✅ Title assertion passed');

    // Assert URL
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ URL assertion passed');
});

// ── TEST 2: Element Assertions ─────────────────────
test('verify Rogers page elements', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Assert page has loaded by checking URL
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Page loaded assertion passed');

    // Take screenshot of home page
    await page.screenshot({ 
        path: 'screenshots/rogers_home.png',
        fullPage: true 
    });
    console.log('📸 Screenshot saved!');
});

// ── TEST 3: Negative Assertions ────────────────────
test('verify Rogers is NOT Bell', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Negative assertion — URL should NOT contain bell
    await expect(page).not.toHaveURL(/bell.com/);
    console.log('✅ Negative assertion passed — not Bell!');

    // Title should NOT be empty
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Title is not empty: "${title}"`);
});

// ── TEST 4: Screenshot on Failure ─────────────────
test('verify page with screenshot on failure', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Take screenshot before assertion
    await page.screenshot({ 
        path: 'screenshots/before_assertion.png' 
    });

    // Assert title
    await expect(page).toHaveTitle(/Rogers/);
    console.log('✅ Assertion passed!');

    // Take screenshot after assertion
    await page.screenshot({ 
        path: 'screenshots/after_assertion.png' 
    });
    console.log('📸 Before + After screenshots saved!');
});