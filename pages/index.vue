<template>
  <div>
    <h1>Welcome to My Weather App</h1>
    <p>Check real-time weather data for any city worldwide.</p>

    <input
      v-model="city"
      type="text"
      placeholder="Enter a city name"
      class="border p-2 mr-2"
    />
    <button @click="goToCity" class="bg-primary text-white p-2 rounded">
      Search
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { city: '' }
  },
  methods: {
    goToCity() {
      if (this.city.trim()) {
        this.$router.push(`/dashboard/${this.city.trim()}`)
      }
    }
  }
}
</script>
