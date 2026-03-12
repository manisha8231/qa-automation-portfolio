const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  // use random email
  const uid = Date.now();
  const email = `test${uid}@example.com`;
  await page.fill('input[data-qa="signup-name"]', 'Playwright User');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await page.waitForNavigation();
  console.log('signed up with', email);
  await browser.close();
})();