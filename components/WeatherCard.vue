<script setup>
import { computed } from 'vue'

const props = defineProps({
  city: { type: String, required: true },
  temp: { type: Number, required: true },
  feels: { type: Number, required: true },
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
  humidity: { type: Number, required: true },
  desc: { type: String, required: true },
  wind: { type: Number, required: true },
  icon: { type: String, required: false },
  unit: { type: String, default: 'imperial' }, // 'metric' = °C, 'imperial' = °F
  currentTime: { type: String, required: true }
})

// Use props.unit in computed
const tempUnit = computed(() => props.unit === 'metric' ? 'C' : 'F')
const windUnit = computed(() => props.unit === 'metric' ? 'm/s' : 'mph')
</script>

<template>
  <div class="card">
    
    <!--flex card city/icon and toggle btn-->
    <div class="card-header">
      
      <!--Left side: city/icon -->
      <div class="left-side">
        <div class="city-icon">
          <h2>{{ city }}</h2>
          <img 
            v-if="icon"
            :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
            :alt="desc"
            style="width: 120px; height: 120px"
          />
        </div>
        <p class="temp">{{ Math.round(temp) }}°{{ tempUnit }}</p>
        <p class="desc">{{ desc }}</p>
        <p class="current-time">{{ currentTime }}</p>
      </div>

    <!--Right side: toggle btn-->
      <button @click="$emit('toggle-unit')">
        Show in {{ unit === 'metric' ? '°F' : '°C' }}
      </button>
    </div> 

    <p class="pt-4">Feels Like: {{ Math.round(feels) }}°{{ tempUnit }}</p>
    <p>Humidity: {{ humidity }}%</p>
    <p>Wind Speed: {{ wind }} {{ windUnit }}</p>
    <p>Sun Rise: {{ new Date(sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}</p>
    <p>Sun Set: {{ new Date(sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}</p>
    
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 400px;
  background-color: transparent;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.3)
}
.left-side {
  display: flex;
  flex-direction: column;
}
.city-icon {
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.temp {
  font-size: 4em;
  margin-top: -0.5em;
}
.desc {
  font-size: 1.5em;
  margin-top: -1.3em;
  margin-bottom: 1.8em;
}
.current-time {
  font-size: 1.5em;
  margin-top: -1em;
}
button {
  background-color: transparent;
}
</style>