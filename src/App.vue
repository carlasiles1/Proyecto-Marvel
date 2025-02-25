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
</style>
