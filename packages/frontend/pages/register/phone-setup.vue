<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Phone Verification
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Verify your phone number to enable voting privileges
        </p>
      </div>

      <!-- Success Alert -->
      <div
        v-if="showSuccess"
        class="rounded-md bg-green-50 p-4"
        role="alert"
        aria-live="polite"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              {{ successMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="rounded-md bg-red-50 p-4"
        role="alert"
        aria-live="assertive"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- Phone Number Input Form -->
      <div v-if="!codeSent" class="bg-white shadow-sm rounded-lg p-6">
        <form @submit.prevent="handleSendCode" class="space-y-6">
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div class="mt-1 relative">
              <input
                id="phone"
                ref="phoneInput"
                v-model="phoneNumber"
                type="tel"
                autocomplete="tel"
                required
                :disabled="isLoading"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{
                  'border-gray-300': !phoneValidationError && !isPhoneValid,
                  'border-green-500': isPhoneValid,
                  'border-red-500': phoneValidationError,
                  'bg-gray-50': isLoading,
                }"
                placeholder="+1234567890"
                aria-describedby="phone-description phone-error"
                :aria-invalid="!!phoneValidationError"
              />
              <div
                v-if="isPhoneValid"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p
              id="phone-description"
              class="mt-2 text-xs text-gray-500"
            >
              Enter your phone number in international format (e.g., +33612345678)
            </p>
            <p
              v-if="phoneValidationError"
              id="phone-error"
              class="mt-2 text-sm text-red-600"
              role="alert"
            >
              {{ phoneValidationError }}
            </p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="!isPhoneValid || isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              :class="{
                'bg-primary-600 hover:bg-primary-700': isPhoneValid && !isLoading,
                'bg-gray-300 cursor-not-allowed': !isPhoneValid || isLoading,
              }"
              :aria-busy="isLoading"
            >
              <span v-if="!isLoading">Send Verification Code</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- SMS Code Verification Form -->
      <div v-else class="bg-white shadow-sm rounded-lg p-6">
        <form @submit.prevent="handleVerifyCode" class="space-y-6">
          <div>
            <label
              for="code"
              class="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <div class="mt-1">
              <input
                id="code"
                ref="codeInput"
                v-model="verificationCode"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="6"
                autocomplete="one-time-code"
                required
                :disabled="isLoading"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center text-2xl tracking-widest"
                :class="{
                  'border-gray-300': !codeValidationError,
                  'border-red-500': codeValidationError,
                  'bg-gray-50': isLoading,
                }"
                placeholder="000000"
                aria-describedby="code-description code-error"
                :aria-invalid="!!codeValidationError"
                @paste="handleCodePaste"
              />
            </div>
            <p
              id="code-description"
              class="mt-2 text-xs text-gray-500"
            >
              Enter the 6-digit code sent to {{ formattedPhoneNumber }}
            </p>
            <p
              v-if="codeValidationError"
              id="code-error"
              class="mt-2 text-sm text-red-600"
              role="alert"
            >
              {{ codeValidationError }}
            </p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="!isCodeValid || isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              :class="{
                'bg-primary-600 hover:bg-primary-700': isCodeValid && !isLoading,
                'bg-gray-300 cursor-not-allowed': !isCodeValid || isLoading,
              }"
              :aria-busy="isLoading"
            >
              <span v-if="!isLoading">Verify Phone Number</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            </button>
          </div>

          <div class="flex items-center justify-between text-sm">
            <button
              type="button"
              @click="handleResendCode"
              :disabled="isLoading || resendCooldown > 0"
              class="font-medium transition-colors focus:outline-none focus:underline"
              :class="{
                'text-primary-600 hover:text-primary-500': resendCooldown === 0 && !isLoading,
                'text-gray-400 cursor-not-allowed': resendCooldown > 0 || isLoading,
              }"
            >
              <span v-if="resendCooldown > 0">
                Resend code in {{ resendCooldown }}s
              </span>
              <span v-else>Resend code</span>
            </button>

            <button
              type="button"
              @click="handleChangePhone"
              :disabled="isLoading"
              class="font-medium text-gray-600 hover:text-gray-500 transition-colors focus:outline-none focus:underline"
              :class="{ 'text-gray-400 cursor-not-allowed': isLoading }"
            >
              Change phone number
            </button>
          </div>
        </form>
      </div>

      <!-- Skip Option -->
      <div class="text-center">
        <p class="text-xs text-gray-500">
          You can set up your phone number later from your profile settings.
        </p>
        <NuxtLink
          to="/"
          class="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
        >
          Skip for now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Router and route
const router = useRouter();
const route = useRoute();

// Get userId from query params (passed from email verification)
const userId = ref<string>('');

// Form state
const phoneNumber = ref('');
const verificationCode = ref('');
const codeSent = ref(false);
const isLoading = ref(false);

// Validation state
const phoneValidationError = ref('');
const codeValidationError = ref('');

// Message state
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);

// Resend cooldown
const resendCooldown = ref(0);
let resendInterval: NodeJS.Timeout | null = null;

// Refs for autofocus
const phoneInput = ref<HTMLInputElement>();
const codeInput = ref<HTMLInputElement>();

// Auth composable
const { sendSmsCode, verifyPhone } = useAuth();

// Computed properties
const isPhoneValid = computed(() => {
  if (!phoneNumber.value) return false;
  try {
    return isValidPhoneNumber(phoneNumber.value);
  } catch {
    return false;
  }
});

const formattedPhoneNumber = computed(() => {
  if (!phoneNumber.value) return '';
  try {
    const parsed = parsePhoneNumber(phoneNumber.value);
    return parsed.formatInternational();
  } catch {
    return phoneNumber.value;
  }
});

const isCodeValid = computed(() => {
  return /^\d{6}$/.test(verificationCode.value);
});

// Watch phone number for validation
watch(phoneNumber, (newValue) => {
  phoneValidationError.value = '';
  if (newValue && newValue.length > 3) {
    try {
      if (!isValidPhoneNumber(newValue)) {
        phoneValidationError.value = 'Invalid phone number format';
      }
    } catch {
      phoneValidationError.value = 'Invalid phone number format';
    }
  }
});

// Watch verification code for validation
watch(verificationCode, (newValue) => {
  codeValidationError.value = '';
  // Only allow digits
  verificationCode.value = newValue.replace(/\D/g, '');

  if (newValue && newValue.length > 0 && newValue.length < 6) {
    if (!/^\d+$/.test(newValue)) {
      codeValidationError.value = 'Only numbers are allowed';
    }
  }
});

// Handle send SMS code
async function handleSendCode(): Promise<void> {
  if (!isPhoneValid.value || !userId.value) return;

  errorMessage.value = '';
  phoneValidationError.value = '';
  isLoading.value = true;

  try {
    // Format phone to E.164
    const parsed = parsePhoneNumber(phoneNumber.value);
    const formattedPhone = parsed.format('E.164');

    const result = await sendSmsCode(userId.value, formattedPhone);

    if (result.success) {
      codeSent.value = true;
      phoneNumber.value = formattedPhone; // Store E.164 format
      successMessage.value = 'Verification code sent successfully!';
      showSuccess.value = true;

      // Start resend cooldown (60 seconds)
      startResendCooldown();

      // Auto-focus code input
      await nextTick();
      codeInput.value?.focus();

      // Hide success message after 5 seconds
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      errorMessage.value = result.error || 'Failed to send SMS code';
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.';
    console.error('Send SMS error:', error);
  } finally {
    isLoading.value = false;
  }
}

// Handle verify code
async function handleVerifyCode(): Promise<void> {
  if (!isCodeValid.value || !userId.value) return;

  errorMessage.value = '';
  codeValidationError.value = '';
  isLoading.value = true;

  try {
    const result = await verifyPhone(userId.value, phoneNumber.value, verificationCode.value);

    if (result.success) {
      successMessage.value = 'Phone verified successfully! Redirecting...';
      showSuccess.value = true;

      // Redirect to password creation page (Story 1.3) or homepage
      setTimeout(() => {
        router.push('/register/password-setup'); // Will be implemented in Story 1.3
      }, 2000);
    } else {
      errorMessage.value = result.error || 'Verification failed';
      if (errorMessage.value.toLowerCase().includes('expired')) {
        codeValidationError.value = 'Code has expired. Please request a new one.';
      } else if (errorMessage.value.toLowerCase().includes('invalid')) {
        codeValidationError.value = 'Invalid code. Please check and try again.';
      }
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.';
    console.error('Verify code error:', error);
  } finally {
    isLoading.value = false;
  }
}

// Handle resend code
async function handleResendCode(): Promise<void> {
  if (resendCooldown.value > 0 || !userId.value) return;

  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    const result = await sendSmsCode(userId.value, phoneNumber.value);

    if (result.success) {
      successMessage.value = 'New verification code sent!';
      showSuccess.value = true;
      verificationCode.value = ''; // Clear previous code

      // Start resend cooldown
      startResendCooldown();

      // Hide success message after 5 seconds
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      errorMessage.value = result.error || 'Failed to resend code';
    }
  } catch (error) {
    errorMessage.value = 'Failed to resend code. Please try again.';
    console.error('Resend code error:', error);
  } finally {
    isLoading.value = false;
  }
}

// Handle change phone number
function handleChangePhone(): void {
  codeSent.value = false;
  verificationCode.value = '';
  errorMessage.value = '';
  successMessage.value = '';
  showSuccess.value = false;
  codeValidationError.value = '';

  // Stop cooldown
  if (resendInterval) {
    clearInterval(resendInterval);
    resendInterval = null;
  }
  resendCooldown.value = 0;

  // Auto-focus phone input
  nextTick(() => {
    phoneInput.value?.focus();
  });
}

// Handle code paste (for auto-fill from SMS)
function handleCodePaste(event: ClipboardEvent): void {
  const pastedText = event.clipboardData?.getData('text');
  if (pastedText) {
    // Extract only digits
    const digits = pastedText.replace(/\D/g, '').slice(0, 6);
    if (digits.length === 6) {
      event.preventDefault();
      verificationCode.value = digits;
    }
  }
}

// Start resend cooldown timer
function startResendCooldown(): void {
  resendCooldown.value = 60; // 60 seconds cooldown

  if (resendInterval) {
    clearInterval(resendInterval);
  }

  resendInterval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      if (resendInterval) {
        clearInterval(resendInterval);
        resendInterval = null;
      }
    }
  }, 1000);
}

// Initialize on mount
onMounted(() => {
  // Get userId from query params
  userId.value = (route.query.userId as string) || '';

  if (!userId.value) {
    // If no userId, redirect to registration
    console.error('No userId provided');
    router.push('/register');
    return;
  }

  // Auto-focus phone input
  nextTick(() => {
    phoneInput.value?.focus();
  });
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (resendInterval) {
    clearInterval(resendInterval);
  }
});
</script>
