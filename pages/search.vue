<script setup>
useHead({
    title: 'Search Weather',
    meta: [
      { name: 'description', content: 'Search weather information for any city worldwide.' },
    ]
})

import { ref } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'

const citySearch = ref('')
const weatherData = ref(null)
const errorMessage = ref('')
const apiKey = 'c564faa43dd4b1742b9f018be4263a49'
const unit = ref('imperial')
const currentTime = ref('')

//Function timezone for any city with auto update time 
const updateTime = (timezoneOffset) => {
  clearInterval(window.searchTimeUpdater)
  window.searchTimeUpdater = setInterval(() => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000
    const localTime = new Date(utc + timezoneOffset * 1000)
    currentTime.value = localTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }, 1000)
}

// Fetch weather data
async function fetchWeatherData() {
  if (!citySearch.value.trim()) return

  try {
    errorMessage.value = ''
    weatherData.value = null

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(citySearch.value)}&appid=${apiKey}&units=${unit.value}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod !== 200) {
      errorMessage.value = 'City not found'
      return
    }

    updateTime(data.timezone)
    weatherData.value = data

  } catch (error) {
    errorMessage.value = 'Failed to fetch weather data'
  }
}

//Toggle C or F
const toggleUnit = () => {
  unit.value = unit.value === 'imperial' ? 'metric' : 'imperial'
  fetchWeatherData()
}

</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Search Weather</h1>
    <p class="lead">Get accurate weather information for any city worldwide.</p>
    
      
      <div class="col-lg-6 mx-auto">
        <!--Search input and button-->
        <div class="card-body text-center p-4">
          <form @submit.prevent="fetchWeatherData">
            <div class="input-group input-group-lg">
              <input
                v-model="citySearch"
                type="text"
                placeholder="Enter a city name" required
                class="form-control"
              />
              <button type="submit" class="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      

        <!--Error Message-->
        <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">
          {{ errorMessage }}
        </div>

        <!--Weather Card-->
        <div class="mt-4 d-flex flex-column align-items-center">
          
          <weather-card
            v-if="weatherData"
            :city="weatherData.name"
            :temp="weatherData.main.temp"
            :sunrise="weatherData.sys.sunrise"
            :sunset="weatherData.sys.sunset"
            :feels="weatherData.main.feels_like"
            :humidity="weatherData.main.humidity"
            :wind="weatherData.wind.speed"
            :desc="weatherData.weather[0].description"
            :icon="weatherData.weather[0].icon"
            :unit="unit"
            :currentTime="currentTime"
            @toggle-unit="toggleUnit"
          />  

          <!--Linked to forecst.vue-->         
          <nuxt-link
            v-if="weatherData"
            :to="`/forecast?city=${encodeURIComponent(weatherData.name)}`"
            class="btn btn-outline-primary mt-3"
           >
            View 5 Day forecast
          </nuxt-link> 

        </div>
     </div>
  </div>

</template>

<style lang="scss">
.btn-outline-primary {
  color: black;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
