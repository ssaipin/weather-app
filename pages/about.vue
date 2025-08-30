 <script setup>
 import NuxtLogo from '@/assets/NuxtLogo.png'
 import OpenWeatherLogo from '@/assets/OpenWeatherLogo.svg-.png'
 import PlusSign from '@/assets/plus.png'

</script>

<template>
  <div class="container text-center">
   
    <div class="LogoIcon">
      <img :src="NuxtLogo" alt="nuxt logo">
      <img :src="PlusSign" alt="plus sign" class="plusicon">
      <img :src="OpenWeatherLogo" alt="open weather logo">
    </div>

    <div class="card-info"> 
    <p class="lead">This is a real time weather application I built as a class project.<br>
        It was a great way to explore the power of <strong>Nuxt.js</strong> for front-end development<br> 
        and the robust data available through the <strong>OpenWeatherMap API.</strong><br> 
        The app gives you auto time and weather informations update for cities all over the world.</p>
    </div>
  </div>
</template>

<style lang="scss">
img {
  width: 400px;
  height: auto;
}
.plusicon {
  width: 100px;
}
.LogoIcon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
}
.card-info {
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 2em;
  border-radius: 8px;
  padding: 2em;
}
</style> 