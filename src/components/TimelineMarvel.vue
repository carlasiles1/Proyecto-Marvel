<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelComics = ref([]);
const containerRef = ref(null);

// Claves de la API (Usa variables de entorno en .env)
const marvelApiPublicKey = 'c6505251612e731238b4d32531d6a998';
const marvelApiPrivateKey = 'ee80321c4497db2e446a64fb6b78d032066c80e1';

// Obtener cómics de Infinity
const fetchMarvelComics = async () => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("https://gateway.marvel.com/v1/public/comics",{
      params: {
        limit: 100,
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
        events: 315,
        orderBy: "-focDate"
      },
    });

    // Verificar la respuesta y los datos
    console.log(response.data);

    // Extraer la información de los cómics
    marvelComics.value = response.data.data.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
  } catch (error) {
    console.error("Error al obtener cómics de Infinity:", error);
  }
};

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
  <section class="sectionTimeLine"> 
    <div class="timeline-container">
      <h2>Cómics de Infinity</h2>
      <div ref="containerRef" class="timeline">
        <div v-for="comic in marvelComics" :key="comic.id" class="comic-card">
          <img :src="comic.image" :alt="comic.title" />
          <p>{{ comic.title }}</p>
        </div>
      </div>
      <div class="timeLineButtons"> 
        <button @click="scrollLeft" class="scroll-button left">⬅</button>
        <button @click="scrollRight" class="scroll-button right">➡</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: -0.5rem;
}
.timeline-container {
  display: flex;
  width: 100%;
  margin-top: 18rem;
  margin-bottom: 20rem;
  flex-direction: column;
}

.timeline {
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

.comic-card img {
  width: 100%;
  border-radius: 8px;
}

.comic-card p {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
}

.scroll-button {
  background: rgb(58, 52, 65);
  color: rgb(212, 212, 212);
  border: none;
  border-radius: 50%;
  padding: 1rem;
  padding-inline: 1.2rem;
  font-size: 1.5rem;
  cursor: pointer;
  bottom: 0%;
}

.left {
  left: 1rem;
}

.right {
  right: 1rem;
}

.timeLineButtons {
  display: flex;
  justify-content: space-between;
  padding-inline: 6rem;
}

.sectionTimeLine {
  background-image: url('@/assets/img/timelineBkg2.png');
  background-size: contain;
  background-repeat: repeat-x;
}

h2 {
  text-align: center;
  color: #e23636;
  margin-bottom: 1rem;
}
</style>
