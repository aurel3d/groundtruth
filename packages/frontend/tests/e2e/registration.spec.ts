import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to registration page before each test
    await page.goto('/register');
  });

  test('should display registration form with all required fields', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

    // Check form fields
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();

    // Check submit button
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });

  test('should show validation errors for invalid email', async ({ page }) => {
    // Fill email with invalid format
    await page.getByLabel('Email address').fill('invalid-email');
    await page.getByLabel('Password', { exact: true }).click(); // Trigger blur

    // Check for error message
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should show password requirements', async ({ page }) => {
    // Check password requirements are visible
    await expect(page.getByText('At least 12 characters')).toBeVisible();
    await expect(page.getByText('One uppercase letter')).toBeVisible();
    await expect(page.getByText('One lowercase letter')).toBeVisible();
    await expect(page.getByText('One number')).toBeVisible();
    await expect(page.getByText('One symbol')).toBeVisible();
  });

  test('should show password strength indicator', async ({ page }) => {
    const passwordInput = page.getByLabel('Password', { exact: true });

    // Type weak password
    await passwordInput.fill('weak');
    await expect(page.getByText('Weak')).toBeVisible();

    // Type fair password
    await passwordInput.fill('WeakPassword1');
    await expect(page.getByText('Fair')).toBeVisible();

    // Type strong password
    await passwordInput.fill('SecurePassword123!');
    await expect(page.getByText('Strong')).toBeVisible();
  });

  test('should disable submit button when form is invalid', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Register' });

    // Button should be disabled initially
    await expect(submitButton).toBeDisabled();

    // Fill email only
    await page.getByLabel('Email address').fill('test@example.com');
    await expect(submitButton).toBeDisabled();

    // Fill weak password
    await page.getByLabel('Password', { exact: true }).fill('weak');
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when form is valid', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Register' });

    // Fill valid email
    await page.getByLabel('Email address').fill('test@example.com');

    // Fill valid password
    await page.getByLabel('Password', { exact: true }).fill('SecurePassword123!');

    // Button should be enabled
    await expect(submitButton).toBeEnabled();
  });

  test('should show success message after successful registration', async ({ page }) => {
    // Mock successful API response
    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Check your email to verify your account',
        }),
      });
    });

    // Fill form with valid data
    await page.getByLabel('Email address').fill('newuser@example.com');
    await page.getByLabel('Password', { exact: true }).fill('SecurePassword123!');

    // Submit form
    await page.getByRole('button', { name: 'Register' }).click();

    // Check for success message
    await expect(
      page.getByText('Check your email to verify your account'),
    ).toBeVisible();
  });

  test('should show error when email already exists', async ({ page }) => {
    // Mock error response
    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'An account with this email already exists',
            details: { email: 'existing@example.com' },
            timestamp: new Date().toISOString(),
            requestId: 'test-request-id',
          },
        }),
      });
    });

    // Fill form
    await page.getByLabel('Email address').fill('existing@example.com');
    await page.getByLabel('Password', { exact: true }).fill('SecurePassword123!');

    // Submit form
    await page.getByRole('button', { name: 'Register' }).click();

    // Check for error message
    await expect(
      page.getByText('An account with this email already exists'),
    ).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through form
    await page.keyboard.press('Tab'); // Focus email
    await expect(page.getByLabel('Email address')).toBeFocused();

    await page.keyboard.press('Tab'); // Focus password
    await expect(page.getByLabel('Password', { exact: true })).toBeFocused();

    await page.keyboard.press('Tab'); // Focus submit button
    await expect(page.getByRole('button', { name: 'Register' })).toBeFocused();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check form is still visible and usable
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });
});

test.describe('Email Verification Flow', () => {
  test('should show error when no token provided', async ({ page }) => {
    await page.goto('/verify-email');

    await expect(page.getByRole('heading', { name: 'No verification token' })).toBeVisible();
    await expect(
      page.getByText('Please click the verification link in your email'),
    ).toBeVisible();
  });

  test('should show success and redirect when valid token provided', async ({ page }) => {
    // Mock successful verification
    await page.route('**/api/v1/auth/verify-email*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          redirectUrl: '/register/phone-setup',
        }),
      });
    });

    // Navigate with token
    await page.goto('/verify-email?token=valid-test-token');

    // Check for success message
    await expect(page.getByRole('heading', { name: 'Email verified!' })).toBeVisible();
  });

  test('should show error when token is invalid', async ({ page }) => {
    // Mock error response
    await page.route('**/api/v1/auth/verify-email*', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            code: 'TOKEN_INVALID',
            message: 'Invalid or expired verification token',
            timestamp: new Date().toISOString(),
            requestId: 'test-request-id',
          },
        }),
      });
    });

    // Navigate with invalid token
    await page.goto('/verify-email?token=invalid-token');

    // Check for error message
    await expect(page.getByRole('heading', { name: 'Verification failed' })).toBeVisible();
    await expect(
      page.getByText('Invalid or expired verification token'),
    ).toBeVisible();
  });
});
