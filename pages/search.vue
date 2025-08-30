<template>
  <div class="container py-4">
    <h1 class="mb-4">Search Weather</h1>
    <p class="lead">Get accurate weather information for any city worldwide.</p>
    
    <div class="row">
      <div class="col-lg-8 mx-auto">

        <!--search-->
        <div class="row mx-auto text-center p-4">
          <form @submit.prevent="fetchWeatherData">
          <input
          v-model="citySearch"
          type="text"
          placeholder="Enter a city name" required
          class="border p-2 mr-2 col-4"
        />
          <button type="submit" class="btn btn-primary">Search</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>