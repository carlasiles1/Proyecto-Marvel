<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelComics = ref([]);
const containerRef = ref(null);
const selectedEvent = ref("Infinity");
const loading = ref(false);

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
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("http://gateway.marvel.com/v1/public/comics", {

    
//http://gateway.marvel.com/v1/public/events?nameStartsWith=infinity
      //get /v1/public/events/{eventId}/stories

    //  http://gateway.marvel.com/v1/public/characters?nameStartsWith=s
      ///v1/public/comics/{comicId}/events
      ///v1/public/events
      //https://gateway.marvel.com/v1/public/comics/{comicId}/events
      //https://gateway.marvel.com/v1/public/series/{seriesId}/comics
      //https://gateway.marvel.com/v1/public/series/19003/comics
     

      params: {
        limit: 40, // Carga 10 comics
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
  }
};

// Observar cambios en selectedEvent
watch(selectedEvent, fetchMarvelComics);

// Funciones para desplazarse con las flechas
const scrollLeft = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};

// Cargar cómics al montar el componente
onMounted(fetchMarvelComics);
</script>

<template>
  <section class="section-timeline"> 
    <div class="section-timeline__container">
      <h2 class="section-timeline__title">Cómics de {{ selectedEvent }}</h2>
      <select v-model="selectedEvent" class="section-timeline__select">
        <option v-for="(id, event) in events" :key="id" :value="event">{{ event }}</option>
      </select>
      <div v-if="loading">Cargando cómics...</div>
      <div v-else-if="marvelComics.length === 0">No se encontraron cómics para este evento.</div>
      <div v-else ref="containerRef" class="section-timeline__comics">
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
  margin: -0.5rem;
}

.section-timeline__container {
  display: flex;
  width: 100%;
  margin-top: 18rem;
  margin-bottom: 20rem;
  flex-direction: column;
}

.section-timeline__title {
  text-align: center;
  color: #e23636;
  margin-bottom: 1rem;
}

.section-timeline__select {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  align-self: center;
  width: 200px;
}

.section-timeline__comics {
  display: flex;
  gap: 6rem;
  padding: 3rem;
  align-items: center;
  overflow-x: auto;
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
  font-size: 0.8rem;
  text-align: center;
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
</style>
