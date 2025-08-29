// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true }
// })

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@bootstrap-vue-next/nuxt',
    
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css' 
  ],
  plugins: [
    '~/plugins/fontawesome.js'
  ],
  
  runtimeConfig: {
    public: {
      weatherApiKey: process.env.NUXT_PUBLIC_WEATHER_KEY,
      weatherApiUrl: 'https://api.openweathermap.org/data/2.5'
    }
  },
  
  axios: {
    baseURL: process.env.NUXT_ENV_WEATHER_BASE_URL 
  },
   ssr: true,
  
  nitro: {
    preset: 'static'
  },
})