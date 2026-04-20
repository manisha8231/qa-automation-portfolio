// tests/hooks.spec.ts
// Week 4 Day 3 — Fixtures & Hooks
// Manisha Wadhwa

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';

// ── HOOKS ──────────────────────────────────────────
test.describe('Rogers Homepage Tests', () => {

    // Runs ONCE before ALL tests in this group
    test.beforeAll(async () => {
        console.log('\n🚀 Starting Rogers test suite...');
        console.log('📅 Date:', new Date().toLocaleDateString());
    });

    // Runs ONCE after ALL tests in this group
    test.afterAll(async () => {
        console.log('\n🏁 All Rogers tests complete!');
    });

    // Runs BEFORE EACH test
    test.beforeEach(async ({ page }) => {
        console.log('\n⚙️  Setting up test...');
        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
        console.log('✅ Rogers loaded — ready for test!');
    });

    // Runs AFTER EACH test
    test.afterEach(async ({ page }, testInfo) => {
        // Take screenshot if test FAILED
        if (testInfo.status === 'failed') {
            await page.screenshot({
                path: `screenshots/FAILED_${testInfo.title}.png`
            });
            console.log(`📸 Failure screenshot saved!`);
        }
        console.log(`\n📊 Test: "${testInfo.title}"`);
        console.log(`   Status: ${testInfo.status}`);
        console.log(`   Duration: ${testInfo.duration}ms`);
    });

    // ── TESTS ── (no need to navigate — beforeEach does it!)
    test('TC001 — Verify Rogers URL', async ({ page }) => {
        await expect(page).toHaveURL(/rogers.com/);
        console.log('✅ URL verified!');
    });

    test('TC002 — Verify Rogers title', async ({ page }) => {
        await expect(page).toHaveTitle(/Rogers/, { timeout: 60000 });
        const title = await page.title();
        console.log(`✅ Title: "${title}"`);
    });

    test('TC003 — Verify page is not competitor', async ({ page }) => {
        await expect(page).not.toHaveURL(/bell.com/);
        await expect(page).not.toHaveURL(/telus.com/);
        console.log('✅ Confirmed Rogers — not a competitor!');
    });

    test('TC004 — Take full page screenshot', async ({ page }) => {
        await page.screenshot({
            path: 'screenshots/rogers_full_page.png',
            fullPage: true
        });
        console.log('📸 Full page screenshot saved!');
    });

    test('TC005 — Verify page loads fast', async ({ page }) => {
        const startTime = Date.now();
        await page.reload({ waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - startTime;

        console.log(`⏱️  Page reload time: ${loadTime}ms`);
        expect(loadTime).toBeLessThan(30000);
        console.log('✅ Page loaded within acceptable time!');
    });
});

// ── SEPARATE DESCRIBE — Login Tests ───────────────
test.describe('Rogers Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        console.log('\n⚙️  Navigating to login page...');
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        console.log('✅ Login page ready!');
    });

    test('TC006 — Login page loads', async ({ page }) => {
        await expect(page).toHaveURL(/rogers.com/);
        console.log('✅ Login page URL verified!');
    });

    test('TC007 — Login page has correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Rogers/, { timeout: 60000 });
        console.log('✅ Login page title verified!');
    });
});