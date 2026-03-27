//pages/dase_page.ts
//Base page shared by ALL page objects
// Manisha Wadhwa
// Week 3 Day 3 — Page Object Model (POM) in Playwright


import { Page } from '@playwright/test';

export class BasePage {
//page = the browser window
protected page: Page;

constructor(page: Page) {
    this.page = page;
}


//Navigate to a URL
async navigate(url: string) {
    await this.page.goto(url);
    console.log(`✅ Navigated to ${url}`);
}


//get current page title
async getTitle(): Promise<string> { 
       return await this.page.title();   
}


//Get current page URL
async getURL(): Promise<string> {
    return this.page.url();

}

//wait for page to load
async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
}

}

