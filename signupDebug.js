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
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  const txt = await page.textContent('body');
  console.log('page text length', txt.length);
  console.log(txt.slice(0,1000));
  await browser.close();
})();