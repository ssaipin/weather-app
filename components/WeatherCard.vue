<template>
  <div class="card">
    <h2>{{ city }}</h2>
    <p>Temperature: {{ temp }}°C</p>
    <p>Humidity: {{ humidity }}%</p>
    <p>Condition: {{ desc }}</p>
    <p>Wind Speed: {{ wind }} m/s</p>
  </div>
</template>

<script>
export default {
  props: {
    city: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    desc: { type: String, required: true },
    wind: { type: Number, required: true }
  }
}
</script>

<style lang="scss">
.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
}
</style>
