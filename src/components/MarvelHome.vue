<style scoped>
*{
  margin: -0.5rem;
  padding: 0rem;
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
.logo{
  width: 15rem;
  height: 10rem;
  position: relative;
  animation-name: bit;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.hammer{
  width: 10rem;
  position: absolute;
  left: 110rem;
  z-index: -1;
}
.animation-hammer{
  animation: thorHammer 1.6s linear 1;
}
@keyframes thorHammer {
  0%{
    left: 110rem;
    z-index: 1;
  }
  50%{
    left: 67rem;
  }
  100%{
    left: -15rem;
    z-index: 1;
  }
}
.animation-move{
  animation: move 0.8s linear 1;
  animation-delay: 0.8s;
}
@keyframes move{
  0%{
    left: 0rem;
  }
  100%{
    left: -82rem;
  }
}
@keyframes bit {
  0%{
    width: 15rem;
    height: 10rem;
  }
  70%{
    width: 15rem;
    height: 10rem;
  }
  80%{
    width: 17rem;
    height: 12rem;
  }
}
</style>

<template>
  <main>
    <img src="@/assets/img/logoTimeline.png" alt="Marvel Logo" :class="['logo', {'animation-move': isdo}]" v-on:click="flyHammer">
    <img src="@/assets/img/thorHammer.png" alt="Thor Hammer moving" :class="['hammer', {'animation-hammer': isdo}]">
  </main>
</template>

<script setup>
import { ref } from 'vue'

const isdo = ref(false)

const flyHammer = () => {
  isdo.value = false
  setTimeout(() => {
    isdo.value = true
  }, 0)
}

</script>