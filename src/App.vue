<template>
  <NavBar/> 
  <QuizComponent msg="Welcome to Your Vue.js App"/>
  <router-view></router-view>
  <FooterComponent/>
</template>

<script setup>
import QuizComponent from './components/QuizComponent.vue'
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<style>
</style>
