<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import md5 from "md5";

const marvelImages = ref([]);
const containerRef = ref(null);
const filter = ref('');
const filterType = ref('all');

const marvelApiPublicKey = process.env.VUE_APP_MARVEL_API_PUBLIC;
const marvelApiPrivateKey = process.env.VUE_APP_MARVEL_API_PRIVATE;

const filteredMarvelData = computed(() => {
  return marvelImages.value.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(filter.value.toLowerCase());
    const typeMatch = filterType.value === 'all' || item.type === filterType.value;
    return nameMatch && typeMatch;
  });
});

const fetchMarvelData = async () => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const [charactersResponse, eventsResponse, seriesResponse] = await Promise.all([
      axios.get("https://gateway.marvel.com/v1/public/characters", {
        params: {
          limit: 10,
          apikey: marvelApiPublicKey,
          ts: timestamp,
          hash: hash,
        },
      }),
      axios.get("https://gateway.marvel.com/v1/public/events", {
        params: {
          limit: 10,
          apikey: marvelApiPublicKey,
          ts: timestamp,
          hash: hash,
        },
      }),
      axios.get("https://gateway.marvel.com/v1/public/series", {
        params: {
          limit: 10,
          apikey: marvelApiPublicKey,
          ts: timestamp,
          hash: hash,
        },
      }),
    ]);

    marvelImages.value = [
      ...charactersResponse.data.data.results.map(item => ({
        id: item.id,
        name: item.name,
        image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        type: 'character'
      })),
      ...eventsResponse.data.data.results.map(item => ({
        id: item.id,
        name: item.title,
        image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        type: 'event'
      })),
      ...seriesResponse.data.data.results.map(item => ({
        id: item.id,
        name: item.title,
        image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        type: 'series'
      }))
    ];
  } catch (error) {
    console.error("Error al obtener datos de Marvel:", error);
  }
};

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

onMounted(fetchMarvelData);
</script>

<template>
  <section class="sectionTimeLine">
    <div class="timeline-container">
      <div class="filter-container">
        <input v-model="filter" placeholder="Filtrar por nombre" class="filter-input" />
        <select v-model="filterType" class="filter-select">
          <option value="all">Todos</option>
          <option value="character">Personajes</option>
          <option value="series">Grupos</option>
          <option value="event">Eventos</option>
        </select>
      </div>
      <div ref="containerRef" class="timeline">
        <div v-for="item in filteredMarvelData" :key="item.id" class="character-card">
          <img :src="item.image" :alt="item.name" />
          <p>{{ item.name }}</p>
          <span>{{ item.type }}</span>
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
}

.character-card {
  flex: 0 0 auto;
  width: 12rem;
  opacity: 100%;
}

.character-card:hover {
  opacity: 80%;
}

.character-card img {
  width: 100%;
  border-radius: 8px;
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

.filter-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-input, .filter-select {
  padding: 0.5rem;
  font-size: 1rem;
}

.filter-input {
  width: 200px;
}

.filter-select {
  width: 150px;
}
</style>
