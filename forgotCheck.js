const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  const forgotLink = await page.$('text=Forgot');
  console.log('forgotLink exists', !!forgotLink);
  if (forgotLink) {
    const href = await forgotLink.getAttribute('href');
    console.log('href', href);
    const text = await forgotLink.textContent();
    console.log('text', text);
  }
  await browser.close();
})();
