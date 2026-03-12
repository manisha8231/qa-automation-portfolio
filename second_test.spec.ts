import { test, expect } from '@playwright/test';

// these tests exercise the login form at automationexercise.com.
//
// A real account is required for the "successful login" and "logout" cases.
// Set the environment variables TEST_EMAIL and TEST_PASSWORD before running,
// or edit the constants below to point at a known user.  You can create a
// permanent user manually via the website; the automated signup flow is
// multi‑step and outside the scope of these examples.

const BASE = 'https://automationexercise.com';

// helper to grab credentials from environment (or fallbacks when appropriate)
const getCredential = () => ({
  email: process.env.TEST_EMAIL || 'abc1231@gmail.com',
  password: process.env.TEST_PASSWORD || 'abc1231@gmail.com',
});

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/login`);
  });

  test('successful login', async ({ page }) => {
    const { email, password } = getCredential();
    test.skip(!email || !password, 'provide TEST_EMAIL and TEST_PASSWORD');

    await page.fill('input[data-qa="login-email"]', email);
    await page.fill('input[data-qa="login-password"]', password);
    await page.click('button[data-qa="login-button"]');

    // after a successful login the header shows a Logout link
    const logoutLink = page.locator('a', { hasText: 'Logout' });
    await expect(logoutLink).toBeVisible();
    // and we should no longer be on the login page
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('wrong password displays error', async ({ page }) => {
    // use a valid email if available so we hit the server error path
    const { email } = getCredential();
    if (email) await page.fill('input[data-qa="login-email"]', email);
    await page.fill('input[data-qa="login-password"]', 'incorrect');
    await page.click('button[data-qa="login-button"]');

    await expect(page.locator('body')).toContainText(
      'Your email or password is incorrect!'
    );
  });

  test('empty fields should not allow login', async ({ page }) => {
    await page.click('button[data-qa="login-button"]');
    await expect(page.locator('body')).toContainText(
      'Please fill out this field.'
    );
  });

  test('Sign Up page leads to Registration page', async ({ page }) => {
    // the login form does not currently expose a link, but the
    // "/forgot_password" endpoint exists – verify it is reachable.
    await page.goto(`${BASE}/forgot_password`);
    await expect(page).toHaveURL(/forgot_password/);
    await expect(page.locator('h2')).toContainText(/Forgot Password/i);
  });

  test('logout after successful login', async ({ page }) => {
    const { email, password } = getCredential();
    test.skip(!email || !password, 'provide TEST_EMAIL and TEST_PASSWORD');

    await page.fill('input[data-qa="login-email"]', email);
    await page.fill('input[data-qa="login-password"]', password);
    await page.click('button[data-qa="login-button"]');

    const logoutLink = page.locator('a', { hasText: 'Logout' });
    await expect(logoutLink).toBeVisible();

    await logoutLink.click();
    // after logout we should be back on the login page
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('h2')).toContainText('Login to your account');
  });
});
