// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // No BootstrapVue module needed
  modules: [],

  css: [
    'bootstrap/dist/css/bootstrap.min.css', // Bootstrap CSS
  ],

  ssr: true,

  nitro: {
    preset: 'static'
  },

  app: {
    head: {
      title: 'Weather App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose', // Load JS at end of body
        }
      ]
    }
  }
})
