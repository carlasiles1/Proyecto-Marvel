<template>
    <main ref="scrollContainer">
      <MarvelHome class="marvel-home" />
      <TimelineMarvel @content-loaded="adjustMainWidth" />
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import gsap from "gsap";
  import MarvelHome from "@/components/MarvelHome.vue";
  import TimelineMarvel from "@/components/TimelineMarvel.vue";
  
  // Referencia al contenedor principal
  const scrollContainer = ref(null);
  
  // Ajusta el ancho del contenedor principal
  const adjustMainWidth = () => {
    const container = scrollContainer.value;
    if (!container) return;
    container.style.width = `${container.scrollWidth}px`;
  };
  
  onMounted(() => {
    const container = scrollContainer.value;
  
    // Ajusta el ancho inicial del contenedor
    adjustMainWidth();
    window.addEventListener("resize", adjustMainWidth);
  
    // Maneja el desplazamiento con la rueda del mouse
    container.addEventListener("wheel", (e) => {
      e.preventDefault(); // Evita el scroll por defecto
      const maxScroll = container.scrollWidth - container.clientWidth;
      gsap.to(container, {
        scrollLeft: Math.min(maxScroll, container.scrollLeft + e.deltaY * 2),
        duration: 0.5,
        ease: "power2.out",
      });
    });
  
    // Maneja el desplazamiento con las teclas de flecha
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
  
  <style scoped>
  main {
    display: flex;
    overflow-x: auto; /* Permite scroll horizontal */
    white-space: nowrap; /* Evita saltos de línea */
    height: 100vh; /* Ocupa toda la altura de la ventana */
    margin-right: 4rem; /* Margen derecho para espacio adicional */
  }
  
  .marvel-home {
    min-width: 100vw; /* Asegura que ocupe al menos el ancho completo de la pantalla */
  }
  </style>