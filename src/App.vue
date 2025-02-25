<template>
  <MarvelHome msg="Welcome to Your Vue.js App"/>
      <router-view></router-view>
      <FooterComponent/>
</template>

<script setup>
import MarvelHome from './components/MarvelHome.vue'
import FooterComponent from './components/FooterComponent.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
