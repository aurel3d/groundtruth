import { ref } from 'vue';
import type { Registration, ApiError } from '@groundtruth/shared';

interface RegistrationResponse {
  message: string;
}

interface EmailVerificationResponse {
  redirectUrl: string;
}

export function useAuth() {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Register a new user with email and password
   */
  async function register(
    email: string,
    password: string,
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<RegistrationResponse>(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        body: {
          email,
          password,
        } as Registration,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (err: unknown) {
      const apiError = err as { data?: ApiError };
      const errorMessage =
        apiError.data?.error?.message || 'Registration failed. Please try again.';
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Verify email using token from verification email
   */
  async function verifyEmail(
    token: string,
  ): Promise<{ success: boolean; redirectUrl?: string; error?: string }> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<EmailVerificationResponse>(
        `${apiBaseUrl}/auth/verify-email`,
        {
          method: 'GET',
          query: { token },
        },
      );

      return {
        success: true,
        redirectUrl: response.redirectUrl,
      };
    } catch (err: unknown) {
      const apiError = err as { data?: ApiError };
      const errorMessage =
        apiError.data?.error?.message || 'Email verification failed. Please try again.';
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    error,
    register,
    verifyEmail,
  };
}
