<style scoped>
main{
  background-image: url('@/assets/img/marvelHomeBkg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
}
.logo{
  width: 15rem;
  height: 10rem;
  position: relative;
  animation: bit 2s ease-in-out infinite alternate;
  cursor: pointer;
}
.hammer{
  width: 10rem;
  position: absolute;
  left: 110rem;
  z-index: -1;
}
.animation-hammer{
  animation: thorHammer 1s linear 1;
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
.animation-move {
  animation-name: move, bit;
  animation-duration: 0.5s, 1s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: 1, infinite;
  animation-direction: normal, alternate;
  animation-delay: 0.5s, 0s;
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

.gif-arrows{
  
  position: fixed;
  bottom: 5rem;
  right: 12rem;
  align-self:first baseline;
  /* 
  mix-blend-mode: multiply; */
  animation: fadein 4s ease-in alternate infinite;
}

@keyframes fadein {
    from { opacity: 0; }
    to { opacity: 0.8; }
}


</style>

<template>
  <main>
    <img src="@/assets/img/logoTimeline.png" alt="Marvel Logo" :class="['logo', {'animation-move': isdo}]" v-on:click="flyHammer">
    <img src="@/assets/img/thorHammer.png" alt="Thor Hammer moving" :class="['hammer', {'animation-hammer': isdo}]">
    <img src= "@/assets/img/arrow-keys.gif" alt="keyboard_arrows" class="gif-arrows" v-show="showArrows">
  </main>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isdo = ref(false);

const flyHammer = () => {
  isdo.value = false
  setTimeout(() => {
    isdo.value = true
  }, 0)
}


const showArrows = ref(true);

function GifArrowsFunction(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    showArrows.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', GifArrowsFunction)
})

onUnmounted(() => {
  window.removeEventListener('keydown', GifArrowsFunction)
})



</script>