<template>
  <NavBar/> 
  <MarvelHome msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import MarvelHome from './components/MarvelHome.vue';
import NavBar from './components/NavBar.vue';
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
