// tests/api_mocking.spec.ts
// Week 4 Day 2 — API Mocking
// Manisha Wadhwa

import { test, expect } from '@playwright/test';

// ── TEST 1: Mock a slow network ────────────────────
test('Handle slow network gracefully', async ({ page }) => {
    console.log('\n⏱️  Test 1: Slow network simulation');

    // Intercept ALL requests and add delay
    await page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100));
        await route.continue();
    });

    await page.goto('https://www.rogers.com', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Page loaded even with slow network!');
});

// ── TEST 2: Mock an API response ───────────────────
test('Mock API response with fake data', async ({ page }) => {
    console.log('\n🎭 Test 2: Mock API response');

    // Intercept API calls and return fake data
    await page.route('**/api/**', async route => {
        console.log(`🔀 Intercepted: ${route.request().url()}`);
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                status: 'success',
                message: 'Mocked response!',
                userId: 99999
            })
        });
    });

    await page.goto('https://www.rogers.com', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Page loaded with mocked API!');
});

// ── TEST 3: Block specific resources ──────────────
test('Block images to speed up tests', async ({ page }) => {
    console.log('\n🚫 Test 3: Block images');

    let blockedCount = 0;

    // Block all image requests — speeds up tests!
    await page.route('**/*.{png,jpg,jpeg,gif,svg,webp}', async route => {
        blockedCount++;
        await route.abort();
    });

    await page.goto('https://www.rogers.com', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    await expect(page).toHaveURL(/rogers.com/);
    console.log(`✅ Page loaded — blocked ${blockedCount} images`);
    console.log('⚡ Tests run faster without loading images!');
});

// ── TEST 4: Mock error response ────────────────────
test('Handle API error gracefully', async ({ page }) => {
    console.log('\n❌ Test 4: Mock API error');

    // Mock a 500 server error
    await page.route('**/api/**', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Internal Server Error',
                code: 500
            })
        });
    });

    await page.goto('https://www.rogers.com', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    // Page should still load even if API fails
    await expect(page).toHaveURL(/rogers.com/);
    console.log('✅ Page handled API error gracefully!');
});

// ── TEST 5: Spy on network requests ───────────────
test('Monitor all network requests', async ({ page }) => {
    console.log('\n👀 Test 5: Network monitoring');

    const requests: string[] = [];

    // Listen to ALL requests made by the page
    page.on('request', request => {
        if (request.url().includes('rogers')) {
            requests.push(request.url());
        }
    });

    await page.goto('https://www.rogers.com', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    console.log(`📊 Rogers made ${requests.length} network requests`);
    console.log('✅ Network monitoring complete!');

    // Verify page loaded
    await expect(page).toHaveURL(/rogers.com/);
});