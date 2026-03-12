const { chromium } = require('playwright');
(async () => {
  const creds = [
    {email:'test@automation.com',pw:'123456'},
    {email:'test@automation.com',pw:'password'},
    {email:'test@example.com',pw:'123456'},
    {email:'automationtester@gmail.com',pw:'automation'},
  ];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const c of creds) {
    await page.goto('https://automationexercise.com/login');
    await page.fill('input[data-qa="login-email"]', c.email);
    await page.fill('input[data-qa="login-password"]', c.pw);
    await page.click('button[data-qa="login-button"]');
    await page.waitForTimeout(2000);
    const body = await page.textContent('body');
    console.log('tried', c, 'body snippet', body.slice(0,200));
    await page.screenshot({ path: `login-${c.email.replace(/[@.]/g,'')}.png`, fullPage:true });
  }
  await browser.close();
})();