// tests/data_driven.spec.ts
// Week 4 Day 1 — Data-Driven Testing
// Manisha Wadhwa

import { test, expect } from '@playwright/test';

// ── TEST DATA ──────────────────────────────────────
// Define multiple sets of test data
const searchTerms = [
    { term: "Internet plans",    expected: "rogers.com" },
    { term: "TV packages",       expected: "rogers.com" },
    { term: "Home phone",        expected: "rogers.com" },
    { term: "Smart home",        expected: "rogers.com" },
];

const pages = [
    { name: "Home",     url: "https://www.rogers.com",                  title: /Rogers/ },
    { name: "Support",  url: "https://www.rogers.com/support",          title: /Rogers/ },
    { name: "Login",    url: "https://www.rogers.com/consumer/profile/login", title: /Rogers/ },
];

// ── TEST 1: Loop through search terms ──────────────
for (const data of searchTerms) {
    test(`Search Rogers for: ${data.term}`, async ({ page }) => {
        console.log(`\n🔍 Testing search: "${data.term}"`);

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        // Verify we're on Rogers
        await expect(page).toHaveURL(/rogers.com/);
        console.log(`✅ Rogers loaded for search: ${data.term}`);

        // Take screenshot for each search term
        await page.screenshot({
            path: `screenshots/search_${data.term.replace(/ /g, '_')}.png`
        });
        console.log(`📸 Screenshot saved for: ${data.term}`);
    });
}

// ── TEST 2: Loop through pages ─────────────────────
for (const data of pages) {
    test(`Verify Rogers ${data.name} page`, async ({ page }) => {
        console.log(`\n🌐 Testing page: ${data.name}`);

        await page.goto(data.url, {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        // Check title
        await expect(page).toHaveTitle(data.title, { timeout: 60000 });
        console.log(`✅ Title verified for: ${data.name}`);

        // Check URL
        await expect(page).toHaveURL(/rogers.com/);
        console.log(`✅ URL verified for: ${data.name}`);
    });
}