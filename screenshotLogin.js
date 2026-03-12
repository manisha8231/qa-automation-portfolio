const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  await page.screenshot({ path: 'login.png', fullPage: true });
  console.log('screenshot saved');
  await browser.close();
})();
