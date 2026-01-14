// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  app: {
    head: {
      title: 'Groundtruth',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Community-driven platform for verifying claims',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-01-01',
});
