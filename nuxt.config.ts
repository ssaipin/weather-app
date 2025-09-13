// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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

        // Default SEO metadataa (fallback)
        { name: 'description', content: 'A simple weather app to check 5 day forecast for any city.' },
        { name: 'keywords', content: 'Nuxt 3, Bootstrap 5, Weather, JavaScript, Web Development, Forecast, Cities, Temperature, App, OpenWeatherMap' },
        { name: 'author', content: 'Gao Saipin' },

        // Open Graph metadata
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Weather App' },
        { property: 'og:description', content: 'Get the lastest weather forecast for any city worldwide.' },
        { property: 'og:url', content: 'https://gao-weather-app.netlify.app/' }, 
        
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
