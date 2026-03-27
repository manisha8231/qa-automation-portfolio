// pages/login_page.ts
// Login page object — Rogers login page
// Manisha Wadhwa — Week 3 Day 3

import { Page, expect } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
    // URL for this page
    private url = 'https://www.rogers.com/consumer/profile/login';

    constructor(page: Page) {
        super(page);    // ← calls BasePage constructor
    }

    // Navigate to login page
    async goto() {
        await this.page.goto(this.url, {
                timeout: 60000,
                waitUntil: 'domcontentloaded'
        });
        console.log('✅ Navigated to login page');
    }

    // Check page loaded correctly
    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/rogers.com/);
        console.log('✅ Login page loaded');
    }

    // Get page title
    async verifyTitle() {
        const title = await this.getTitle();
        console.log(`📄 Page title: ${title}`);
        return title;
    }

    // Check login form exists
    async verifyLoginFormExists() {
        await this.waitForPageLoad();
        const url = await this.getURL();
        console.log(`🔍 Current URL: ${url}`);
        return url.includes('rogers.com');
    }
}