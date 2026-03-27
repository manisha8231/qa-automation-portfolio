// pages/home_page.ts
// Home page object — Rogers home page
// Manisha Wadhwa — Week 3 Day 3

import { Page, expect } from '@playwright/test';
import { BasePage } from './base_page';

export class HomePage extends BasePage {
    private url = 'https://www.rogers.com';

    constructor(page: Page) {
        super(page);
    }

    // Navigate to home page
    async goto() {
        await this.navigate(this.url);
    }

    // Verify home page loaded
    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/rogers.com/);
        console.log('✅ Home page loaded');
    }

    // Get page title
    async verifyTitle() {
        const title = await this.getTitle();
        console.log(`📄 Page title: ${title}`);
        return title;
    }

    // Check Rogers logo visible
    async verifyRogersURL() {
        const url = await this.getURL();
        const isRogers = url.includes('rogers.com');
        if (isRogers) {
            console.log('✅ Rogers URL verified');
        } else {
            console.log('❌ Wrong URL detected');
        }
        return isRogers;
    }
}