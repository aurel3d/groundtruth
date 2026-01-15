<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verified!
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Your email has been successfully verified
        </p>
      </div>

      <!-- Success Message -->
      <div
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
              Your email address has been verified successfully.
            </p>
          </div>
        </div>
      </div>

      <!-- Phone Setup Coming Soon -->
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Phone Number Setup
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          Phone number verification will be available in the next release.
          For now, you can proceed with your email-verified account.
        </p>
        <div class="mt-6">
          <NuxtLink
            to="/"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Continue to Homepage
          </NuxtLink>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="text-center">
        <p class="text-xs text-gray-500">
          You can set up your phone number later from your profile settings.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Phone setup page - placeholder for Story 1.2 (User Registration with Phone Number)
// This page is displayed after email verification is complete
// Full phone number setup functionality will be implemented in Story 1.2
</script>
