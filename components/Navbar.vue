
<template>
  <div id="app">
    <nav class="nav navbar-expand-sm">
      <div class="container-fluid py-2 d-flex align-items-center">
        <nuxt-link to="/" class="navbar-brand d-flex">
                WeatherApp
        </nuxt-link>

        <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span> 
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/search" class="nav-link">Search</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/dashboard" class="nav-link">Dashboard</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/about" class="nav-link">About</nuxt-link>
            </li>
          </ul>
        </div>  
      </div>
    </nav>
  </div>
    
            
</template>



<style lang="scss">

nav {

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 1rem;

      a {
        color: black;
        text-decoration: none;
        font-size: 1.2em;

        &:hover {
          text-decoration: underline; // SCSS nesting
        }
      }
    }
  }
}
.navbar-brand {
  font-size: 1.5em;
  color: black;
  text-decoration: none;
}

</style>

