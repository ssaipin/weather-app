<template>
  <nav class="navbar navbar-expand-sm">
    <div class="container-fluid">
      <!-- Brand -->
      <nuxt-link to="/" class="navbar-brand">
        WeatherApp
      </nuxt-link>

      <!-- Hamburger toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
          <li class="nav-item me-3">
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item me-3">
            <nuxt-link to="/search" class="nav-link">Search</nuxt-link>
          </li>
          <li class="nav-item me-3">
            <nuxt-link to="/forecast" class="nav-link">Forecast</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/about" class="nav-link">About</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: rgba(255, 255, 255, 0.3);
  
}
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.nav-link {
  font-size: 1.2rem;
  color: black;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
