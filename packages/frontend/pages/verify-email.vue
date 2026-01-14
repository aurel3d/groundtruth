<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Loading State -->
      <div v-if="isVerifying" class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
          <svg
            class="animate-spin h-8 w-8 text-primary-600"
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
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
        <p class="text-gray-600">Please wait while we verify your email address</p>
      </div>

      <!-- Success State -->
      <div v-else-if="verificationSuccess" class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            class="h-8 w-8 text-green-600"
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
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Email verified!</h2>
        <p class="text-gray-600 mb-6">Your email has been successfully verified.</p>
        <p class="text-sm text-gray-500 mb-4">Redirecting to phone setup...</p>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${redirectProgress}%` }"
          />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="verificationError" class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg
            class="h-8 w-8 text-red-600"
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
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Verification failed</h2>
        <p class="text-gray-600 mb-6">{{ verificationError }}</p>
        <div class="space-y-3">
          <button
            type="button"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            @click="requestNewLink"
          >
            Request new verification email
          </button>
          <a
            href="/"
            class="block w-full text-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Return to home
          </a>
        </div>
      </div>

      <!-- No Token State -->
      <div v-else class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
          <svg
            class="h-8 w-8 text-yellow-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No verification token</h2>
        <p class="text-gray-600 mb-6">
          Please click the verification link in your email to verify your account.
        </p>
        <a
          href="/"
          class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Return to home
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const { verifyEmail } = useAuth();

const isVerifying = ref(false);
const verificationSuccess = ref(false);
const verificationError = ref<string | null>(null);
const redirectProgress = ref(0);

onMounted(async () => {
  const token = route.query.token as string;

  if (!token) {
    // No token provided, show error state
    return;
  }

  // Start verification
  isVerifying.value = true;

  try {
    const result = await verifyEmail(token);

    if (result.success) {
      verificationSuccess.value = true;

      // Start redirect countdown
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        redirectProgress.value = progress;

        if (progress >= 100) {
          clearInterval(interval);
          router.push(result.redirectUrl || '/register/phone-setup');
        }
      }, 400); // 5 steps of 400ms = 2 seconds
    } else {
      verificationError.value = result.error || 'Verification failed. Please try again.';
    }
  } catch (error) {
    verificationError.value = 'An unexpected error occurred. Please try again.';
  } finally {
    isVerifying.value = false;
  }
});

function requestNewLink(): void {
  // TODO: Implement request new verification email functionality
  // For now, navigate to registration page
  router.push('/register');
}
</script>
