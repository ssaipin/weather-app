<template>
  <div>
    <h1>Weather in {{ city }}</h1>
    <WeatherCard
      v-if="weather"
      :city="weather.name"
      :temp="weather.main.temp"
      :humidity="weather.main.humidity"
      :desc="weather.weather[0].description"
      :wind="weather.wind.speed"
    />
    <p v-else>City not found or loading...</p>

    <nuxt-link to="/weather" class="text-blue-600 underline block mt-4">
      Back to Dashboard
    </nuxt-link>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: { WeatherCard },
  async asyncData({ params, $axios }) {
    const apiKey = process.env.OWM_API_KEY || 'YOUR_API_KEY'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${apiKey}&units=metric`
    try {
      const weather = await $axios.$get(url)
      return { weather, city: params.city }
    } catch (error) {
      return { weather: null, city: params.city }
    }
  }
}
</script>
