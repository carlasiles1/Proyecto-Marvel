<template>
  <div class="div">
    <NavBar/> 
    <router-view></router-view>
    <FooterComponent/>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'

</script>
 
<style>
.div{
  margin: -0.5rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
