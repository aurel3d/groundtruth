<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Join Groundtruth to verify claims
        </p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
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
            <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <form v-if="!successMessage" class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :class="{
                'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500':
                  emailError,
                'border-gray-300': !emailError,
              }"
              placeholder="you@example.com"
              :aria-invalid="emailError ? 'true' : 'false'"
              :aria-describedby="emailError ? 'email-error' : undefined"
              @blur="validateEmail"
            />
            <p v-if="emailError" id="email-error" class="mt-1 text-sm text-red-600" role="alert">
              {{ emailError }}
            </p>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :class="{
                'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500':
                  passwordError,
                'border-gray-300': !passwordError,
              }"
              placeholder="••••••••••••"
              :aria-invalid="passwordError ? 'true' : 'false'"
              :aria-describedby="passwordError ? 'password-error password-requirements' : 'password-requirements'"
              @blur="validatePassword"
              @input="updatePasswordStrength"
            />
            <p v-if="passwordError" id="password-error" class="mt-1 text-sm text-red-600" role="alert">
              {{ passwordError }}
            </p>

            <!-- Password Strength Indicator -->
            <div v-if="formData.password" class="mt-2">
              <div class="flex items-center">
                <div class="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full transition-all duration-300"
                    :class="passwordStrengthColor"
                    :style="{ width: `${passwordStrength}%` }"
                  />
                </div>
                <span class="ml-2 text-xs text-gray-600">{{ passwordStrengthLabel }}</span>
              </div>
            </div>

            <!-- Password Requirements -->
            <div id="password-requirements" class="mt-2 text-xs text-gray-600">
              <p>Password must contain:</p>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li :class="{ 'text-green-600': passwordChecks.length }">At least 12 characters</li>
                <li :class="{ 'text-green-600': passwordChecks.uppercase }">One uppercase letter</li>
                <li :class="{ 'text-green-600': passwordChecks.lowercase }">One lowercase letter</li>
                <li :class="{ 'text-green-600': passwordChecks.number }">One number</li>
                <li :class="{ 'text-green-600': passwordChecks.symbol }">One symbol</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="apiError" class="rounded-md bg-red-50 p-4" role="alert" aria-live="assertive">
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
              <p class="text-sm font-medium text-red-800">{{ apiError }}</p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            :aria-busy="isLoading"
          >
            <span v-if="!isLoading">Register</span>
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
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Registering...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RegistrationSchema } from '@groundtruth/shared';

const formData = ref({
  email: '',
  password: '',
});

const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const apiError = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const { register, isLoading } = useAuth();

// Password strength tracking
const passwordStrength = ref(0);
const passwordStrengthLabel = ref('');
const passwordStrengthColor = ref('');

const passwordChecks = computed(() => ({
  length: formData.value.password.length >= 12,
  uppercase: /[A-Z]/.test(formData.value.password),
  lowercase: /[a-z]/.test(formData.value.password),
  number: /\d/.test(formData.value.password),
  symbol: /[@$!%*?&#^()_+=\-[\]{}|\\:;"'<>,.~/`]/.test(formData.value.password),
}));

const isFormValid = computed(() => {
  return (
    formData.value.email &&
    formData.value.password &&
    !emailError.value &&
    !passwordError.value &&
    Object.values(passwordChecks.value).every((check) => check)
  );
});

function validateEmail(): void {
  try {
    RegistrationSchema.shape.email.parse(formData.value.email);
    emailError.value = null;
  } catch (error) {
    if (error instanceof Error) {
      emailError.value = 'Please enter a valid email address';
    }
  }
}

function validatePassword(): void {
  try {
    RegistrationSchema.shape.password.parse(formData.value.password);
    passwordError.value = null;
  } catch (error) {
    if (error instanceof Error) {
      passwordError.value = 'Password does not meet requirements';
    }
  }
}

function updatePasswordStrength(): void {
  const checks = passwordChecks.value;
  const checksPassed = Object.values(checks).filter(Boolean).length;
  const strengthPercent = (checksPassed / 5) * 100;

  passwordStrength.value = strengthPercent;

  if (strengthPercent === 0) {
    passwordStrengthLabel.value = '';
    passwordStrengthColor.value = '';
  } else if (strengthPercent <= 40) {
    passwordStrengthLabel.value = 'Weak';
    passwordStrengthColor.value = 'bg-red-500';
  } else if (strengthPercent <= 80) {
    passwordStrengthLabel.value = 'Fair';
    passwordStrengthColor.value = 'bg-yellow-500';
  } else {
    passwordStrengthLabel.value = 'Strong';
    passwordStrengthColor.value = 'bg-green-500';
  }
}

async function handleSubmit(): Promise<void> {
  apiError.value = null;

  // Validate before submit
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) {
    return;
  }

  const result = await register(formData.value.email, formData.value.password);

  if (result.success) {
    successMessage.value = result.message || 'Check your email to verify your account';
    // Clear form
    formData.value = { email: '', password: '' };
  } else {
    apiError.value = result.error || 'Registration failed. Please try again.';
  }
}
</script>
