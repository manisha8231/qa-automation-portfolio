const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'foo@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrong');
  await page.click('button[data-qa="login-button"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'login_error.png', fullPage: true });
  console.log('screenshot after error saved');
  await browser.close();
})();
