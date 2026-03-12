import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'foo@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrong');
  await page.click('button[data-qa="login-button"]');
  await page.waitForTimeout(3000);
  const body = await page.textContent('body');
  console.log('BODY START');
  console.log(body);
  console.log('BODY END');
  await browser.close();
})();
