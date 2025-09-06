<script setup>
import { ref, onMounted } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';

const city = ref('Seattle');
const currentWeather = ref(null);
const apiKey = 'c564faa43dd4b1742b9f018be4263a49';
const unit = ref('imperial'); // 'metric' = °C, 'imperial' = °F


// Function to fetch weather data
const fetchWeatherData = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit.value}`);
    if (!response.ok) throw new Error('City not found')
    const data = await response.json();
    currentWeather.value = data
    console.log(currentWeather.value);  
  } catch (error) {
    console.error('Error fetching weather data:', error);
    currentWeather.value = null;
  }
}

// Toggle unit between C and F
const toggleUnit = () => {
  unit.value = unit.value === 'imperial' ? 'metric' : 'imperial'
  fetchWeatherData()
}

//Seattle Time and function to update time
const currentTime = ref('');

const updateTime = (timezoneOffset) => {
  clearInterval(window.timeUpdater); 
  window.timeUpdater = setInterval(() => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezoneOffset * 1000);
    currentTime.value = localTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }, 1000);
};

onMounted(async() => {
  await fetchWeatherData();
  updateTime(currentWeather.value.timezone);
});

onUnmounted(() => {
  if (window.timeUpdater) {
    clearInterval(window.timeUpdater);
  }
});
</script>

<template>
  <div class="content-card pt-4">
    
    <div>
      <h1>Current Weather Location</h1>
      <p class="lead">Real time and weather update</p>
    </div>
    
   
          <weather-card
            v-if="currentWeather"
            :city="currentWeather.name"
            :temp="currentWeather.main.temp"
            :feels="currentWeather.main.feels_like"
            :sunrise="currentWeather.sys.sunrise"
            :sunset="currentWeather.sys.sunset"
            :humidity="currentWeather.main.humidity"
            :wind="currentWeather.wind.speed"
            :desc="currentWeather.weather[0].description"
            :icon="currentWeather.weather[0].icon"
            :unit="unit"
            :currentTime="currentTime"
            @toggle-unit="toggleUnit"
          />
          <div v-else>
            Loading weather data...
          </div>
          
        </div>
</template>

<style lang="scss">
.content-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8em;
}
</style>