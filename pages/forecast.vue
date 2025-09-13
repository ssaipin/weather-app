<script setup>
useHead({
    title: '5 Day Forecast',
    meta: [
      { name: 'description', content: 'Check the 5 day weather forecast for your city.' }
    ]
})

import { ref, onMounted, computed, watch } from 'vue' 
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const city = ref(route.query.city || '') // auto-fill from search.vue
const citySearch = ref(route.query.city || '')
const dailyForecast = ref([])
const errorMessage = ref('')
const isLoading = ref(false)
const unit = ref('imperial')
const unitSymbol = computed(() => unit.value === 'metric' ? 'C' : 'F')
const toggleLabel = computed(() => unit.value === 'metric' ? 'F' : 'C')
const apiKey = 'c564faa43dd4b1742b9f018be4263a49'

// Watch for URL change when navigating from search.vue
watch(() => route.query.city, (newCity) => {
  if (newCity && newCity !== city.value) {
    city.value = newCity
    citySearch.value = newCity
    fetchForecast()
  }
}, { immediate: true })

// Group forecast data by day and get daily summary
function processForecastData(forecastList) {
  const dailyData = {}
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000)
    const dateKey = date.toDateString()
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        temps: [],
        descriptions: [],
        icons: []
      }
    }
    
    dailyData[dateKey].temps.push(item.main.temp)
    dailyData[dateKey].descriptions.push(item.weather[0].description)
    dailyData[dateKey].icons.push(item.weather[0].icon)
  })

  // Convert to array and calculate daily summary
  return Object.values(dailyData).map(day => ({
    date: day.date,
    maxTemp: Math.max(...day.temps),
    minTemp: Math.min(...day.temps),
    description: day.descriptions[0],
    icon: day.icons[0]
  }))
}

// API function
async function fetchForecast() {
  if (!city.value) {
    errorMessage.value = ''
    dailyForecast.value = []
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    dailyForecast.value = []
    console.log('Fetching forecast for:', city.value) 
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city.value)}&units=${unit.value}&appid=${apiKey}`
    )
    const data = await response.json()
    console.log('Forecast data:', data) 
    
    if (data.cod !== "200") {
      throw new Error(data.message || 'City not found')
    }

    if (!data.list || data.list.length === 0) {
      throw new Error('No forecast data available')
    }
    
    dailyForecast.value = processForecastData(data.list)
    console.log('Processed daily forecast:', dailyForecast.value) 
    
  } catch (error) {
    errorMessage.value = error.message
    console.error('Fetch error:', error)
    dailyForecast.value = []
  } finally {
    isLoading.value = false
  }
}

// User Actions
function searchForCity() {
  const trimmedCity = citySearch.value.trim()
  if (!trimmedCity) {
    errorMessage.value = 'Please enter a city name'
    return
  }
  console.log('Searching for:', trimmedCity)
  
  city.value = trimmedCity
  errorMessage.value = ''
  dailyForecast.value = []

  // Update URL query
  router.replace({ query: { city: trimmedCity } })
  
  // Fetch new forecast
  fetchForecast()
}

onMounted(() => {
  if (city.value) {
    fetchForecast()
  }
})

// Toggle between °C and °F
const toggleUnit = () => {
  unit.value = unit.value === 'imperial' ? 'metric' : 'imperial'

  if (city.value) {
    fetchForecast()
  }
}

</script>

<template>
  <div class="container p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">
      5 Day Forecast for {{ city }}
    </h1>

    <!--City Search-->
   
    <div class="card-body text-center p-4">
      <form @submit.prevent="searchForCity">
        <div class="input-group input-group-lg">
          <input
            v-model="citySearch"
            type="text"
            placeholder="Enter a city name"
            required
            class="form-control"
          />
          <button type="submit" class="btn btn-primary">Get Forecast</button>
        </div>
        <!--Toggle Button-->
        <button
          type="button"
          @click="toggleUnit"
          class="btn-outline-primary rounded p-2 mt-3 "
        >
          °{{ toggleLabel }}
        </button>
      </form>
    </div>
    

    <!-- Error message -->
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">
      {{ errorMessage }}
    </div>

    <!-- Forecast grid -->
    <div v-if="dailyForecast.length"
      class="row text-center justify-content-center gap-4" >
      <div
        v-for="(day, index) in dailyForecast.slice(0, 5)"
        :key="index"
        class="card rounded mb-4 shadow col-12 col-sm-6 col-md-4 col-lg-2"
      >
      <div class="card-header mt-2">
        <p class="fw-bold">{{ day.date }}</p>
        
        <img
          :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
          :alt="day.description"
          style="width: 120px; height: 120px"
          />
        <p class="capitalize fw-bold">
          {{ day.description }}
        </p>
        </div>
        <p>H: {{ Math.round(day.maxTemp) }}°{{ unitSymbol }}</p>
        <p>L: {{ Math.round(day.minTemp) }}°{{ unitSymbol }}</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="!errorMessage" class="text-gray-500 text-center">
      Loading forecast...
    </div>
  </div>
</template>

<style scoped>
.container {
  width: auto;
}
.capitalize {
  text-transform: capitalize;
}
.btn-outline-primary {
  background-color: transparent;
}
.card {
  background-color: transparent;
  border: 1px solid white;
  width: 200px;
}
.card-header {
  background-color: rgba(255, 255, 255, 0.3)
}
</style>
