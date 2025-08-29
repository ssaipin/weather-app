<template>
  <div>
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

</style>
