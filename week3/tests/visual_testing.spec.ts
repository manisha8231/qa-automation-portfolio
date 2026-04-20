// tests/visual_testing.spec.ts
// Week 4 Day 4 — Visual Testing + Advanced Screenshots
// Manisha Wadhwa

import { test, expect } from '@playwright/test';

test.describe('Visual Testing — Rogers Website', () => {

    // ── TEST 1: Full Page Screenshot ───────────────
    test('TC001 — Capture full Rogers homepage', async ({ page }) => {
        console.log('\n📸 TC001: Full page screenshot');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        // Full page screenshot
        await page.screenshot({
            path: 'screenshots/visual/rogers_full.png',
            fullPage: true
        });
        console.log('✅ Full page screenshot saved!');

        // Viewport only screenshot
        await page.screenshot({
            path: 'screenshots/visual/rogers_viewport.png',
            fullPage: false
        });
        console.log('✅ Viewport screenshot saved!');
    });

    // ── TEST 2: Element Screenshot ──────────────────
    test('TC002 — Screenshot specific elements', async ({ page }) => {
        console.log('\n🔍 TC002: Element screenshots');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        // Screenshot of header area
        const header = page.locator('header').first();
        if (await header.isVisible()) {
            await header.screenshot({
                path: 'screenshots/visual/rogers_header.png'
            });
            console.log('✅ Header screenshot saved!');
        } else {
            console.log('⚠️  Header not visible — skipping');
        }

        // Screenshot of body
        const body = page.locator('body');
        await body.screenshot({
            path: 'screenshots/visual/rogers_body.png'
        });
        console.log('✅ Body screenshot saved!');
    });

    // ── TEST 3: Mobile viewport screenshot ─────────
    test('TC003 — Mobile viewport screenshot', async ({ page }) => {
        console.log('\n📱 TC003: Mobile viewport');

        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 812 });
        console.log('📱 Viewport set to iPhone size (375x812)');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        await page.screenshot({
            path: 'screenshots/visual/rogers_mobile.png',
            fullPage: true
        });
        console.log('✅ Mobile screenshot saved!');

        // Verify page still works on mobile
        await expect(page).toHaveURL(/rogers.com/);
        console.log('✅ Rogers works on mobile viewport!');
    });

    // ── TEST 4: Tablet viewport screenshot ─────────
    test('TC004 — Tablet viewport screenshot', async ({ page }) => {
        console.log('\n💻 TC004: Tablet viewport');

        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        console.log('💻 Viewport set to iPad size (768x1024)');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        await page.screenshot({
            path: 'screenshots/visual/rogers_tablet.png',
            fullPage: true
        });
        console.log('✅ Tablet screenshot saved!');

        await expect(page).toHaveURL(/rogers.com/);
        console.log('✅ Rogers works on tablet viewport!');
    });

    // ── TEST 5: Desktop viewport screenshot ────────
    test('TC005 — Desktop viewport screenshot', async ({ page }) => {
        console.log('\n🖥️  TC005: Desktop viewport');

        // Set desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        console.log('🖥️  Viewport set to Full HD (1920x1080)');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        await page.screenshot({
            path: 'screenshots/visual/rogers_desktop.png',
            fullPage: true
        });
        console.log('✅ Desktop screenshot saved!');

        await expect(page).toHaveURL(/rogers.com/);
        console.log('✅ Rogers works on desktop viewport!');
    });

    // ── TEST 6: Screenshot with clipping ───────────
    test('TC006 — Clipped screenshot (top section only)', async ({ page }) => {
        console.log('\n✂️  TC006: Clipped screenshot');

        await page.goto('https://www.rogers.com', {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });

        // Screenshot of just the top 400px
        await page.screenshot({
            path: 'screenshots/visual/rogers_clipped.png',
            clip: {
                x: 0,
                y: 0,
                width: 1280,
                height: 400
            }
        });
        console.log('✅ Clipped screenshot saved — top 400px only!');
    });

    // ── TEST 7: Compare page sizes ──────────────────
    test('TC007 — Responsive design check', async ({ page }) => {
        console.log('\n📐 TC007: Responsive design check');

        const viewports = [
            { name: 'Mobile',  width: 375,  height: 812  },
            { name: 'Tablet',  width: 768,  height: 1024 },
            { name: 'Desktop', width: 1280, height: 800  },
        ];

        for (const vp of viewports) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto('https://www.rogers.com', {
                timeout: 60000,
                waitUntil: 'domcontentloaded'
            });

            await expect(page).toHaveURL(/rogers.com/);
            await page.screenshot({
                path: `screenshots/visual/rogers_${vp.name.toLowerCase()}_responsive.png`
            });
            console.log(`✅ ${vp.name} (${vp.width}x${vp.height}) — verified!`);
        }
    });
});