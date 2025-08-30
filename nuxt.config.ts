// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@bootstrap-vue-next/nuxt',

    
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    
  ],

  // runtimeConfig: {
  //   public: {
  //     weatherApiKey: process.env.NUXT_ENV_WEATHER_API_KEY,
  //     weatherApiUrl: process.env.NUXT_ENV_WEATHER_BASE_URL
  //   }
  // },
  
   ssr: true,
  
  nitro: {
    preset: 'static'
  },

  app: {
    head: {
      title: 'Weather App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },     
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose', // Recommended position for performance
        }
      ]
    }
  }
})