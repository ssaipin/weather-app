<template>
  <div>
    <h1>Weather Dashboard</h1>
    <div class="grid">
      <WeatherCard
        v-for="(cityData, index) in cities"
        :key="index"
        :city="cityData.name"
        :temp="cityData.main.temp"
        :humidity="cityData.main.humidity"
        :desc="cityData.weather[0].description"
        :wind="cityData.wind.speed"
      />
    </div>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: { WeatherCard },
  async asyncData({ $axios }) {
    const apiKey = process.env.NUXT_PUBLIC_WEATHER_KEY
    const cityList = ['Seattle', 'Portland', 'New York', 'Los Angeles']
    const requests = cityList.map(city =>
      $axios.$get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    )
    const cities = await Promise.all(requests)
    return { cities }
  }
}
</script>

<style lang="scss">
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
