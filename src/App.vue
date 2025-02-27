<template>
  <main id="main" ref="scrollContainer">
    <MarvelHome class="marvelHome" msg="Welcome to Your Vue.js App" />
    <TimelineMarvel @content-loaded="adjustMainWidth" />
  </main>
  <div class="div">
    <NavBar/> 
    <router-view></router-view>
    <FooterComponent/>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'

import { onMounted, ref } from "vue";
import gsap from "gsap";
import MarvelHome from "./components/MarvelHome.vue";
import TimelineMarvel from "./components/TimelineMarvel.vue";

const scrollContainer = ref(null);

const adjustMainWidth = () => {
  const container = scrollContainer.value;
  if (!container) return;

  // 🔹 Asegurar que `main` tenga un ancho suficiente
  const minWidthNeeded = container.scrollWidth; // Se ajusta al contenido real
  container.style.width = `${minWidthNeeded}px`;
};

onMounted(() => {
  const container = scrollContainer.value;

  // 🔹 Ajustamos el ancho cuando el contenido se carga
  adjustMainWidth();
  window.addEventListener("resize", adjustMainWidth);

  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    const maxScroll = container.scrollWidth - container.clientWidth;

    gsap.to(container, {
      scrollLeft: Math.min(maxScroll, container.scrollLeft + e.deltaY * 2),
      duration: 0.5,
      ease: "power2.out",
    });
  });

  document.addEventListener("keydown", (e) => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (e.key === "ArrowRight") {
      gsap.to(container, {
        scrollLeft: Math.min(maxScroll, container.scrollLeft + 200),
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (e.key === "ArrowLeft") {
      gsap.to(container, {
        scrollLeft: Math.max(0, container.scrollLeft - 200),
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
});
</script>

<style>
main {
  display: flex;
  overflow-x: auto; /* Permitir scroll sin bloqueos */
  white-space: nowrap;
  height: 100vh;
  margin-right: 4rem;
}
.marvelHome {
  min-width: 100vw;
}
</style>
