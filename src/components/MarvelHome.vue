<style scoped>

body{
  max-width: fit-content;
  padding-right:2rem ;
}

main{
  background-image: url('@/assets/img/marvelHomeBkg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  max-width: fit-content;

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
  bottom: 6.5rem;
  right: 70%;
  align-self:first baseline;
  
 /* mix-blend-mode: multiply;  */
  animation: fadein 4s ease-in alternate infinite;
}

@keyframes fadein {
    from { opacity: 0; }
    to { opacity: 0.8; }
} 

.section-timeline__button {
 background: none;
  color: rgb(212, 212, 212);
  border: 0.05rem solid white;
  border-radius: 50%;
  padding: 1rem;
  padding-inline: 1.2rem;
  font-size: 1.5rem;
  cursor: pointer;
  margin-inline: 3rem;

  
}

.section-timeline__button:hover{
  background-color: rgba(255, 253, 253, 0.351);
  color: rgb(25, 25, 36);
}


 .section-timeline__buttons {
  position: fixed;
  bottom: 11rem;
  right: 12rem;
  align-self:first baseline;
  z-index: 12;
  

}  

</style>

<template>
  <main>
    <img src="@/assets/img/logoTimeline.png" alt="Marvel Logo" :class="['logo', {'animation-move': isdo}]" v-on:click="flyHammer">
    <img src="@/assets/img/thorHammer.png" alt="Thor Hammer moving" :class="['hammer', {'animation-hammer': isdo}]">
    <img src= "@/assets/img/arrow-keys.gif" alt="keyboard_arrows" class="gif-arrows" v-show="showArrows">
    <!-- <div class="section-timeline__buttons"> 
      <button 
  @mousedown="startScroll(-1)" 
  @mouseup="stopScroll" 
  @mouseleave="stopScroll" 
  class="section-timeline__button section-timeline__button--left">⬅
</button>

<button 
  @mousedown="startScroll(1)" 
  @mouseup="stopScroll" 
  @mouseleave="stopScroll" 
  class="section-timeline__button section-timeline__button--right">➡
</button>
      </div> -->
  </main>

</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';

const showArrows = ref(true); 

const isdo = ref(false);


const flyHammer = () => {
  isdo.value = false
  setTimeout(() => {
    isdo.value = true
  }, 0)
}

const handleKeyScroll = (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    showArrows.value = false; // Hide the GIF when an arrow key is used
  }
};
onMounted(() => {
  window.addEventListener("keydown", handleKeyScroll);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyScroll);
});


//Scroll


// const scrollAmount = 20; // Cantidad de desplazamiento por frame
// const scrolling = ref(false);

// const scroll = (direction) => {
//   if (!scrolling.value) return; // Si el usuario ya soltó el botón, no hacer nada
//   window.scrollBy({ left: direction * scrollAmount });
//   requestAnimationFrame(() => scroll(direction)); // Llamar recursivamente para suavidad
// };

// const startScroll = (direction) => {
//   scrolling.value = true;
//   scroll(direction);
// };

// const stopScroll = () => {
//   scrolling.value = false;
 //};


</script>