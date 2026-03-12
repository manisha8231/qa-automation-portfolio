const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  const uid = Date.now();
  const email = `test${uid}@example.com`;
  await page.fill('input[data-qa="signup-name"]', 'Playwright User');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'signedup.png', fullPage: true });
  const body = await page.textContent('body');
  console.log('body after signup snippet:', body.slice(0,500));
  console.log('signup complete with email', email);
  await browser.close();
})();