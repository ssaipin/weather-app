<template>
  <div class="container py-4">
    <h1 class="mb-4">
      <i class="fas fa-search text-primary me-2"></i>
      Search Weather
    </h1>
    
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <!-- Search Form -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body p-4">
            <form @submit.prevent="searchCity">
              <div class="input-group input-group-lg">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  placeholder="Enter city name (e.g., London, New York, Tokyo)"
                  required
                  :disabled="loading"
                >
                <button 
                  class="btn btn-primary px-4" 
                  type="submit"
                  :disabled="loading || !searchQuery.trim()"
                >
                  <i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-search'"></i>
                  <span class="ms-2">{{ loading ? 'Searching...' : 'Search' }}</span>
                </button>
              </div>
            </form>
            
            <!-- Search suggestions -->
            <div class="mt-3" v-if="suggestions.length > 0">
              <small class="text-muted">Popular cities:</small>
              <div class="d-flex flex-wrap gap-2 mt-2">
                <button 
                  v-for="city in suggestions"
                  :key="city"
                  @click="searchQuery = city; searchCity()"
                  class="btn btn-sm btn-outline-secondary"
                >
                  {{ city }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchResults" class="mb-4">
          <h3 class="h5 mb-3">Search Results</h3>
          <weather-card
            :city-name="searchResults.name"
            :country-name="searchResults.sys.country"
            :temperature="searchResults.main.temp"
            :feels-like="searchResults.main.feels_like"
            :humidity="searchResults.main.humidity"
            :wind-speed="searchResults.wind.speed"
            :pressure="searchResults.main.pressure"
            :weather-description="searchResults.weather[0].description"
            :weather-icon="searchResults.weather[0].icon"
            :city-id="searchResults.id"
            @favorite-toggled="onFavoriteToggled"
            @refresh="refreshSearch"
          />
        </div>

        <!-- Search History -->
        <div v-if="searchHistory.length > 0">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">
              <i class="fas fa-history text-secondary me-2"></i>
              Recent Searches
            </h3>
            <button @click="clearHistory" class="btn btn-sm btn-outline-danger">
              <i class="fas fa-trash me-1"></i>Clear
            </button>
          </div>
          
          <div class="row g-3">
            <div 
              class="col-md-6 col-xl-4" 
              v-for="item in searchHistory" 
              :key="item.id"
            >
              <weather-card
                :city-name="item.name"
                :country-name="item.country"
                :temperature="item.temperature"
                :feels-like="item.feelsLike"
                :humidity="item.humidity"
                :wind-speed="item.windSpeed"
                :pressure="item.pressure"
                :weather-description="item.description"
                :weather-icon="item.icon"
                :city-id="item.id"
                @favorite-toggled="onFavoriteToggled"
              />
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="alert alert-danger d-flex align-items-center">
          <i class="fas fa-exclamation-triangle me-3"></i>
          <div>
            <strong>City not found!</strong><br>
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard
  },
  
  data() {
    return {
      searchQuery: '',
      searchResults: null,
      searchHistory: [],
      loading: false,
      error: null,
      suggestions: [
        'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 
        'Berlin', 'Mumbai', 'Dubai', 'Singapore', 'Amsterdam'
      ]
    }
  },
  
  mounted() {
    // Check for query parameter
    const city = this.$route.query.city
    if (city) {
      this.searchQuery = city
      this.searchCity()
    }
    
    this.loadSearchHistory()
  },
  
  methods: {
    async searchCity() {
      if (!this.searchQuery.trim()) return
      
      this.loading = true
      this.error = null
      this.searchResults = null
      
      try {
        const response = await this.$axios.get('/weather', {
          params: {
            q: this.searchQuery.trim(),
            appid: process.env.NUXT_ENV_WEATHER_API_KEY,
            units: 'metric'
          }
        })
        
        this.searchResults = response.data
        this.saveToHistory(response.data)
        
        // Update URL without page reload
        this.$router.replace({ 
          query: { city: this.searchQuery.trim() } 
        })
        
      } catch (error) {
        this.error = `Please check the spelling and try again. Make sure to enter a valid city name.`
        console.error('Search error:', error)
      } finally {
        this.loading = false
      }
    },
    
    saveToHistory(weatherData) {
      if (!process.client) return
      
      const historyItem = {
        id: weatherData.id,
        name: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        searchedAt: new Date().toISOString()
      }
      
      let history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      
      // Remove if already exists
      history = history.filter(item => item.id !== historyItem.id)
      
      // Add to beginning
      history.unshift(historyItem)
      
      // Keep only last 6 searches
      history = history.slice(0, 6)
      
      localStorage.setItem('searchHistory', JSON.stringify(history))
      this.searchHistory = history
    },
    
    loadSearchHistory() {
      if (process.client) {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      }
    },
    
    clearHistory() {
      if (process.client) {
        localStorage.removeItem('searchHistory')
        this.searchHistory = []
      }
    },
    
    refreshSearch() {
      if (this.searchResults) {
        this.searchQuery = this.searchResults.name
        this.searchCity()
      }
    },
    
    onFavoriteToggled(data) {
      // Handle favorite feedback
      const action = data.isFavorite ? 'added to' : 'removed from'
      console.log(`${data.city.name} ${action} favorites`)
    }
  },
  
  head() {
    return {
      title: 'Search Weather - WeatherHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search for current weather conditions in any city worldwide.'
        }
      ]
    }
  }
}
</script>