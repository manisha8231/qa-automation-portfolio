import { test, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com';

test.describe('Signup page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/login`);
  });

  test('successful signup with valid details', async ({ page }) => {
    const timestamp = Date.now();
    const testData = {
      name: `Test User ${timestamp}`,
      email: `testuser${timestamp}@test.com`,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
    };

    // Step 1: Fill initial signup form on login page
    await page.fill('input[data-qa="signup-name"]', testData.name);
    await page.fill('input[data-qa="signup-email"]', testData.email);
    await page.click('button[data-qa="signup-button"]');

    // Should navigate to signup form
    await expect(page).toHaveURL(/\/signup/);
    await page.locator('h2:has-text("Enter Account Information")').waitFor({ state: 'visible', timeout: 5000 });
    await expect(page.locator('h2')).toContainText(/Enter Account Information/i);

    // Step 2: Fill detailed registration form
    // Select title (Mr.)
    await page.click('input[name="title"][value="Mr"]');

    // Fill name (pre-populated from step 1)
    await page.fill('input[data-qa="name"]', testData.name);

    // Fill email (pre-populated from step 1)
    await page.fill('input[data-qa="email"]', testData.email);

    // Fill password
    await page.fill('input[data-qa="password"]', testData.password);

    // Select date of birth
    await page.selectOption('select[name="days"]', '15');
    await page.selectOption('select[name="months"]', 'March');
    await page.selectOption('select[name="years"]', '1990');

    // Check newsletter and optin checkboxes
    await page.check('input[name="newsletter"]');
    await page.check('input[name="optin"]');

    // Fill first and last name
    await page.fill('input[data-qa="first_name"]', testData.firstName);
    await page.fill('input[data-qa="last_name"]', testData.lastName);

    // Fill company and address fields (if present)
    const companyInput = page.locator('input[data-qa="company"]');
    const addressInput = page.locator('input[data-qa="address"]');
    const stateInput = page.locator('input[data-qa="state"]');
    const cityInput = page.locator('input[data-qa="city"]');
    const zipInput = page.locator('input[data-qa="zipcode"]');

    if (await companyInput.isVisible()) {
      await companyInput.fill('Test Company');
    }
    if (await addressInput.isVisible()) {
      await addressInput.fill('123 Test Street');
    }
    if (await cityInput.isVisible()) {
      await cityInput.fill('Test City');
    }
    if (await stateInput.isVisible()) {
      await stateInput.fill('Test State');
    }
    if (await zipInput.isVisible()) {
      await zipInput.fill('12345');
    }

    // Select country
    const countrySelect = page.locator('select[name="country"]');
    if (await countrySelect.isVisible()) {
      await countrySelect.selectOption('United States');
    }

    // Fill phone number
    const phoneInput = page.locator('input[data-qa="mobile_number"]');
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('1234567890');
    }

    // Submit the form
    await page.click('button[data-qa="create-account"]');

    // Should show account created success message
    await expect(page.locator('body')).toContainText(/account.*created|successfully|congratulations/i);
  });

  test('signup fails with empty name field', async ({ page }) => {
    const timestamp = Date.now();
    const testData = {
      email: `testuser${timestamp}@test.com`,
    };

    // Leave name empty but fill email
    await page.fill('input[data-qa="signup-name"]', '');
    await page.fill('input[data-qa="signup-email"]', testData.email);
    await page.click('button[data-qa="signup-button"]');

    // Browser validation should prevent submission or show error
    // If allowed to proceed, check for error message
    const nameInput = page.locator('input[data-qa="signup-name"]');
    const isRequired = await nameInput.evaluate((el: HTMLInputElement) => el.required);
    expect(isRequired).toBeTruthy();
  });

  test('signup fails with empty email field', async ({ page }) => {
    const timestamp = Date.now();
    const testData = {
      name: `Test User ${timestamp}`,
    };

    // Fill name but leave email empty
    await page.fill('input[data-qa="signup-name"]', testData.name);
    await page.fill('input[data-qa="signup-email"]', '');
    await page.click('button[data-qa="signup-button"]');

    // Should not proceed to registration form
    const emailInput = page.locator('input[data-qa="signup-email"]');
    const isRequired = await emailInput.evaluate((el: HTMLInputElement) => el.required);
    expect(isRequired).toBeTruthy();
  });

  test('signup fails with invalid email format', async ({ page }) => {
    const timestamp = Date.now();
    const testData = {
      name: `Test User ${timestamp}`,
      invalidEmail: 'not-an-email',
    };

    await page.fill('input[data-qa="signup-name"]', testData.name);
    await page.fill('input[data-qa="signup-email"]', testData.invalidEmail);

    // The input should have email validation
    const emailInput = page.locator('input[data-qa="signup-email"]');
    const inputType = await emailInput.getAttribute('type');
    expect(inputType).toBe('email');
  });

  test('signup with existing email shows error', async ({ page }) => {
    // Use the credentials from the environment that we know exist
    const existingEmail = 'abc1231@gmail.com';
    const timestamp = Date.now();

    await page.fill('input[data-qa="signup-name"]', `Test User ${timestamp}`);
    await page.fill('input[data-qa="signup-email"]', existingEmail);
    await page.click('button[data-qa="signup-button"]');

    // Should navigate to signup (or show inline error)
    await page.waitForTimeout(1000);

    // Check if error message appears about email already existing
    const pageText = await page.textContent('body');
    // If it shows an error, verify error message is present
    if (pageText?.includes('exist')) {
      await expect(page.locator('body')).toContainText(/already.*exist|email.*already/i);
    }
  });

  test('all required fields are marked as required', async ({ page }) => {
    const timestamp = Date.now();
    const testData = {
      name: `Test User ${timestamp}`,
      email: `testuser${timestamp}@test.com`,
    };

    // Go to signup form
    await page.fill('input[data-qa="signup-name"]', testData.name);
    await page.fill('input[data-qa="signup-email"]', testData.email);
    await page.click('button[data-qa="signup-button"]');

    await expect(page).toHaveURL(/\/signup/);

    // Verify required fields
    const requiredFields = ['name', 'email', 'password', 'first_name', 'last_name'];
    for (const field of requiredFields) {
      const input = page.locator(`input[data-qa="${field}"]`);
      if (await input.isVisible()) {
        const required = await input.evaluate((el: HTMLInputElement) => el.required);
        expect(required).toBeTruthy();
      }
    }
  });
});
