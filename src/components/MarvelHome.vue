<style scoped>
*{
  margin: 0;
  padding: 0;
}
main{
  background-image: url('@/assets/img/marvelHomeBkg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
main img{
  width: 15rem;
  height: 10rem;
}
</style>

<template>
  <main>
    <img :src='require("@/assets/img/logoTimeline.png")' alt="">
  </main>
</template>

<script setup>

</script>

