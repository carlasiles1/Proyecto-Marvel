<!-- <script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelComics = ref([]);
// const containerRef = ref(null);
const selectedEvent = ref("Infinity");
const loading = ref(false);
const scrollPos = ref(0);
const showSelector = ref(true);

// Claves de la API (Usa variables de entorno en .env)
const marvelApiPublicKey = 'c6505251612e731238b4d32531d6a998';
const marvelApiPrivateKey = 'ee80321c4497db2e446a64fb6b78d032066c80e1';

// Objeto con eventos y sus IDs
const events = {
  "Age of Apocalypse": 227,
  "Age of Ultron": 314,
  "Annihilation": 229,
  "Annihilation: Conquest": 231,
  "Avengers Disassembled": 234,
  "Avengers NOW!": 320,
  "Avengers VS X-Men": 310,
  "Blood and Thunder": 238,
  "Chaos War": 296,
  "Civil War": 238,
  "Civil War II": 330,
  "Days of Future Present": 242,
  "Fear Itself": 302,
  "Infinity": 315,
  "Infinity Gauntlet": 253,
  "Infinity War": 29,
  "Planet Hulk": 212,
  "Secret Wars": 270,
  "Secret Empire": 336,
  "Secret Invasion": 269,
  "Secret Wars II": 271
};

// Obtener cómics del evento seleccionado
const fetchMarvelComics = async () => {
  loading.value = true;
  
  // Guardamos la posición del scroll antes de cargar los nuevos cómics
  scrollPos.value = document.querySelector(".section-timeline")?.scrollLeft || 0;

  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("https://gateway.marvel.com/v1/public/comics", {
      params: {
        limit: 100,
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
        events: events[selectedEvent.value],
        orderBy: "-focDate"
      },
    });

    marvelComics.value = response.data.data.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
    console.log("Cómics cargados:", marvelComics.value);
  } catch (error) {
    console.error(`Error al obtener cómics de ${selectedEvent.value}:`, error);
  } finally {
    loading.value = false;

    // Restauramos la posición del scroll DESPUÉS de la carga
    const timeline = document.querySelector(".section-timeline");
    if (timeline) {
      timeline.scrollTo({
        left: scrollPos.value,
        behavior: "instant"
      });
    }
  }
};

const handleScroll = () => {
  const timeline = document.querySelector(".section-timeline");
  if (timeline) {
    scrollPos.value = timeline.scrollLeft;
    showSelector.value = scrollPos.value > 50 && scrollPos.value < 300;
  }
};

const handleKeyScroll = (e) => {
  const timeline = document.querySelector(".section-timeline");
  if (!timeline) return;
    // Arrow detection: left or right
    if (e.key === "ArrowLeft") {
    e.preventDefault(); // Avoid vertical scroll
    timeline.scrollBy({ left: -50, behavior: "smooth" });
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    timeline.scrollBy({ left: 50, behavior: "smooth" });
  }
    // Save position 
    scrollPos.value = timeline.scrollLeft;
};

onMounted(() => {
  fetchMarvelComics();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyScroll);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyScroll);
  window.removeEventListener("scroll", handleScroll);
});

// Observar cambios en selectedEvent
watch(selectedEvent, () => {
  fetchMarvelComics();
});
// // Funciones para desplazarse con las flechas
// const scrollLeft = () => {
//   if (containerRef.value) {
//     containerRef.value.scrollBy({ left: -300, behavior: "smooth" });
//   }
// };

// const scrollRight = () => {
//   if (containerRef.value) {
//     containerRef.value.scrollBy({ left: 300, behavior: "smooth" });
//   }
// };


// // Mostrar el selector solo en cierta parte del scroll
// const handleScroll = (e) => {
//   console.log("Scroll detectado");
//   scrollPos.value = e.target.scrollLeft;
//   console.log("Posición scroll:", scrollPos.value);
//   showSelector.value = scrollPos.value > 50 && scrollPos.value < 300;};
// onMounted(() => {
//   fetchMarvelComics();
//   if (containerRef.value) {
//     console.log("Evento de scroll añadido");
//     containerRef.value.addEventListener("scroll", handleScroll);
//   }
// });

// onUnmounted(() => {
//   if (containerRef.value) {
//     containerRef.value.removeEventListener("scroll", handleScroll);
//   }
// });

// // Cargar cómics al montar el componente
// // onMounted(fetchMarvelComics);
</script>

<template>
  
  <section class="section-timeline"> 
  
    <div class="section-timeline__container">     

      <div class="section-eventSelector">
  <p class="section-timeline__title">{{ selectedEvent }} comics</p>
  <select v-model="selectedEvent" class="section-timeline__select">
    <option v-for="(id, event) in events" :key="id" :value="event">{{ event }}</option>
  </select>
</div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="marvelComics.length === 0">Not found</div>
      <div v-else class="section-timeline__comics">
        <div v-for="comic in marvelComics" :key="comic.id" class="comic-card">
          <img :src="comic.image" :alt="comic.title" class="comic-card__image" />
          <p class="comic-card__title">{{ comic.title }}</p>
        </div>
      </div>
      <div class="section-timeline__buttons"> 
        <button @click="scrollLeft" class="section-timeline__button section-timeline__button--left">⬅</button>
        <button @click="scrollRight" class="section-timeline__button section-timeline__button--right">➡</button>
      </div>
    </div>
  </section>
</template>

<style scoped>

.section-timeline {
  /* position: relative; Asegura que el contenedor padre no tenga overflow oculto */
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 2rem;
  height: 100vh;

}

.section-eventSelector {
  position: sticky;
  left: 0; /* Pegado al borde izquierdo */
  /* top: 0; Ajusta la altura si lo necesitas */
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  z-index: 10;
  height: fit-content; 
  width: fit-content;
}


.section-timeline__container {
  display: flex;
  /* overflow-x: scroll;  */
    gap: 1rem;
  padding-bottom: 2rem;
  width: 100%;
}

.section-timeline__title {
  
  color: #fdfbfb;
  margin-bottom: 1rem;
  background: black;
  font-size: 1.1rem;
  max-width: fit-content;
}

.section-timeline__select {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 200px;
}

.section-timeline__comics {
  display: flex;
  gap: 6rem;
  padding: 3rem;
  align-items: center;
  /* overflow-x: auto; */
  scroll-behavior: smooth;
  
}

.comic-card {
  flex: 0 0 auto;
  width: 12rem;
  opacity: 100%;
}

.comic-card:hover {
  opacity: 80%;
}

.comic-card__image {
  width: 100%;
  border-radius: 8px;
}

.comic-card__title {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  color: rgb(219, 217, 217);
  background: rgb(0, 0, 0);
}

.section-timeline__button {
  background: rgb(58, 52, 65);
  color: rgb(212, 212, 212);
  border: none;
  border-radius: 50%;
  padding: 1rem;
  padding-inline: 1.2rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.section-timeline__button--left {
  left: 1rem;
}

.section-timeline__button--right {
  right: 1rem;
}

.section-timeline__buttons {
  display: flex;
  justify-content: space-between;
  padding-inline: 6rem;
}

.section-timeline {
  background-image: url('@/assets/img/timelineBkg2.png');
  background-size: contain;
  background-repeat: repeat-x;
}
</style> -->
