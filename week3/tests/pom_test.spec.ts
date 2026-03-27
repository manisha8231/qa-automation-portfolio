// tests/pom_test.spec.ts
// Page Object Model tests — Rogers website
// Manisha Wadhwa — Week 3 Day 3

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { HomePage } from '../pages/home_page';

// ── TEST 1: Home Page ──────────────────────────────
test('Rogers home page loads correctly', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.verifyPageLoaded();
    await homePage.verifyTitle();
    await homePage.verifyRogersURL();

    console.log('✅ Home page test complete!');
});

// ── TEST 2: Login Page ─────────────────────────────
test('Rogers login page loads correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.verifyPageLoaded();
    await loginPage.verifyTitle();
    await loginPage.verifyLoginFormExists();

    console.log('✅ Login page test complete!');
});

// ── TEST 3: Navigate Between Pages ────────────────
test('Navigate from home to login', async ({ page }) => {
    const homePage  = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Start at home
    await homePage.goto();
    await homePage.verifyPageLoaded();
    console.log('✅ Started at home page');

    // Go to login
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
    console.log('✅ Navigated to login page');

    // Verify we're on login page
    const url = await loginPage.getURL();
    expect(url).toContain('rogers.com');
    console.log(`✅ Final URL: ${url}`);
});