const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/login');
  const email = `user${Date.now()}@test.com`;
  const name = 'Test User';
  
  await page.fill('input[data-qa="signup-name"]', name);
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  
  await page.waitForTimeout(2000);
  const url = page.url();
  const body = await page.textContent('body');
  
  console.log('URL after signup:', url);
  console.log('Body text:', body.slice(0, 1500));
  
  const inputs = await page.$$eval('input', els => 
    els.map(e => ({
      type: e.type,
      name: e.name,
      placeholder: e.placeholder,
      'data-qa': e.getAttribute('data-qa'),
      value: e.value
    }))
  );
  console.log('Inputs after signup:', JSON.stringify(inputs.slice(0, 10), null, 2));
  
  await browser.close();
})();
