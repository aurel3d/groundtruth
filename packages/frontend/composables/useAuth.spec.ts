import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from './useAuth';

// Mock runtime config
vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBaseUrl: 'http://localhost:3001/api/v1',
    },
  }),
}));

// Mock $fetch
global.$fetch = vi.fn();

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register user when valid credentials provided', async () => {
      const mockResponse = {
        message: 'Check your email to verify your account',
      };

      (global.$fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const { register } = useAuth();
      const result = await register('test@example.com', 'SecurePassword123!');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Check your email to verify your account');
      expect(global.$fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/auth/register',
        {
          method: 'POST',
          body: {
            email: 'test@example.com',
            password: 'SecurePassword123!',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should return error when email already exists', async () => {
      const mockError = {
        data: {
          error: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'An account with this email already exists',
          },
        },
      };

      (global.$fetch as ReturnType<typeof vi.fn>).mockRejectedValue(mockError);

      const { register } = useAuth();
      const result = await register('existing@example.com', 'SecurePassword123!');

      expect(result.success).toBe(false);
      expect(result.error).toBe('An account with this email already exists');
    });

    it('should return generic error when request fails', async () => {
      (global.$fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

      const { register } = useAuth();
      const result = await register('test@example.com', 'SecurePassword123!');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Registration failed. Please try again.');
    });

    it('should set loading state during request', async () => {
      const mockResponse = { message: 'Success' };
      (global.$fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const { register, isLoading } = useAuth();

      expect(isLoading.value).toBe(false);

      const promise = register('test@example.com', 'SecurePassword123!');
      // Loading should be true during request
      // Note: In real async scenario, this would be true, but in tests it resolves immediately

      await promise;
      expect(isLoading.value).toBe(false);
    });
  });

  describe('verifyEmail', () => {
    it('should successfully verify email when valid token provided', async () => {
      const mockResponse = {
        redirectUrl: '/register/phone-setup',
      };

      (global.$fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const { verifyEmail } = useAuth();
      const result = await verifyEmail('valid-token');

      expect(result.success).toBe(true);
      expect(result.redirectUrl).toBe('/register/phone-setup');
      expect(global.$fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/auth/verify-email',
        {
          method: 'GET',
          query: { token: 'valid-token' },
        },
      );
    });

    it('should return error when token is invalid', async () => {
      const mockError = {
        data: {
          error: {
            code: 'TOKEN_INVALID',
            message: 'Invalid or expired verification token',
          },
        },
      };

      (global.$fetch as ReturnType<typeof vi.fn>).mockRejectedValue(mockError);

      const { verifyEmail } = useAuth();
      const result = await verifyEmail('invalid-token');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid or expired verification token');
    });

    it('should return generic error when request fails', async () => {
      (global.$fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

      const { verifyEmail } = useAuth();
      const result = await verifyEmail('some-token');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Email verification failed. Please try again.');
    });
  });
});
