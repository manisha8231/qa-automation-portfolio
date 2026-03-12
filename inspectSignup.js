const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/signup');
  await page.waitForTimeout(1000);
  const body = await page.textContent('body');
  console.log('Body text:', body.slice(0, 1500));
  const inputs = await page.$$eval('input', els => 
    els.map(e => ({
      type: e.type,
      name: e.name,
      placeholder: e.placeholder,
      'data-qa': e.getAttribute('data-qa')
    }))
  );
  console.log('Inputs:', JSON.stringify(inputs, null, 2));
  await browser.close();
})();
