
<script setup>
import { computed } from 'vue'

const props = defineProps({
  city: { type: String, required: true },
  temp: { type: Number, required: true },
  humidity: { type: Number, required: true },
  desc: { type: String, required: true },
  wind: { type: Number, required: true },
  icon: { type: String, required: false },
  unit: { type: String, default: 'imperial' }, // 'metric' = °C, 'imperial' = °F
  currentTime: { type: String, required: true }
})

// Use props.unit in computed
const tempUnit = computed(() => props.unit === 'metric' ? 'C' : 'F')
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
        <p class="current-time">{{ currentTime }}</p>
      </div>

    <!--Right side: toggle btn-->
      <button @click="$emit('toggle-unit')">
        Show in {{ unit === 'metric' ? '°F' : '°C' }}
      </button>
    </div>  
  
    <p class="pt-4">Humidity: {{ humidity }}%</p>
    <p>Condition: {{ desc }}</p>
    <p>Wind Speed: {{ wind }} m/s</p>
    
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
  background-color: transparent;
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
.current-time {
  font-size: 1.5em;
  margin-top: -1em;

}
</style>
