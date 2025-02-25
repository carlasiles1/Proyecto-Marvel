<template>
  <NavBar/> 
  <MarvelHome msg="Welcome to Your Vue.js App"/>
  <router-view></router-view>
  <FooterComponent/>
</template>

<script setup>
import MarvelHome from './components/MarvelHome.vue'
import NavBar from './components/NavBar.vue'

</script>

<style>
</style>
