const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'foo@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrong');
  await page.click('button[data-qa="login-button"]');
  await page.waitForTimeout(1000);
  const links = await page.$$eval('a', as => as.map(a => ({text: a.textContent, href: a.href})).filter(l => l.text && l.text.toLowerCase().includes('forgot')));
  console.log('found links', links);
  await browser.close();
})();