// tests/rogers_suite.spec.ts
// Week 3 Day 5 — Full Rogers Test Suite
// Runs on Chrome, Firefox, Safari
// Manisha Wadhwa

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';

// ── TEST 1: Home Page Loads ────────────────────────
test('TC001 — Rogers home page loads correctly', async ({ page }) => {
    console.log('\n🔵 TC001: Home page load test');
    const homePage = new HomePage(page);

    // Navigate
    await homePage.goto();

    // Assertions
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ URL assertion passed');

    // Screenshot
    await page.screenshot({
        path: 'screenshots/TC001_home.png'
    });
    console.log('📸 TC001 screenshot saved');
});

// ── TEST 2: Page Title ─────────────────────────────
test('TC002 — Rogers page has correct title', async ({ page }) => {
    console.log('\n🔵 TC002: Page title test');
    const homePage = new HomePage(page);

    await homePage.goto();

     // await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveTitle(/Rogers/, { timeout: 60000 })
    // Get and verify title
    const title = await page.title();
   // expect(title.length).toBeGreaterThan(0);
    console.log(`✅ Page title: "${title}"`);

    // Assert title contains Rogers
    await expect(page).toHaveTitle(/Rogers/);
    console.log('✅ Title contains Rogers');
});

// ── TEST 3: Login Page Loads ───────────────────────
test('TC003 — Rogers login page loads correctly', async ({ page }) => {
    console.log('\n🔵 TC003: Login page test');
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.verifyPageLoaded();

    // Verify URL changed to login
    const url = await page.url();
    expect(url).toContain('rogers.com');
    console.log(`✅ Login URL verified: ${url}`);

    // Screenshot
    await page.screenshot({
        path: 'screenshots/TC003_login.png'
    });
    console.log('📸 TC003 screenshot saved');
});

// ── TEST 4: Navigation Flow ────────────────────────
test('TC004 — Navigate home then to login', async ({ page }) => {
    console.log('\n🔵 TC004: Navigation flow test');
    const homePage  = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Step 1 — Go to home
    await homePage.goto();
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Step 1: Home page loaded');

    // Screenshot home
    await page.screenshot({ path: 'screenshots/TC004_step1_home.png' });

    // Step 2 — Go to login
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
    console.log('✅ Step 2: Login page loaded');

    // Screenshot login
    await page.screenshot({ path: 'screenshots/TC004_step2_login.png' });

    console.log('✅ TC004: Navigation flow complete!');
});

// ── TEST 5: Negative Tests ─────────────────────────
test('TC005 — Rogers is not a competitor site', async ({ page }) => {
    console.log('\n🔵 TC005: Negative test');
    const homePage = new HomePage(page);

    await homePage.goto();

    // Should NOT be competitor sites
    await expect(page).not.toHaveURL(/bell.com/);
    console.log('✅ Not Bell Canada');

    await expect(page).not.toHaveURL(/telus.com/);
    console.log('✅ Not TELUS');

    await expect(page).not.toHaveURL(/shaw.com/);
    console.log('✅ Not Shaw');

    // Should be Rogers
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Confirmed Rogers URL!');
});