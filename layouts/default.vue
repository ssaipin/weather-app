<template>
  <div class="whole-content">
    <Navbar />
    <main class="p-4 d-flex flex-column min-vh-100">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Navbar, Footer }
}
</script>

<style lang="scss">
.whole-content {
  background-image: url('@/assets/sky.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
