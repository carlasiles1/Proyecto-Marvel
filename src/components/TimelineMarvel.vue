<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import axios from "axios"; // Import axios for HTTP requests and md5 for hash generation
import md5 from "md5";

// Reactive variables
const marvelComics = ref([]);
const selectedEvent = ref("Infinity");
const loading = ref(false);
const scrollPos = ref(0);
const showSelector = ref(true); // Controls the visibility of the event selector

// API keys
const marvelApiPublicKey = 'c6505251612e731238b4d32531d6a998';
const marvelApiPrivateKey = 'ee80321c4497db2e446a64fb6b78d032066c80e1';

// Object with events and their IDs
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

// Fetch comics for the selected event
const fetchMarvelComics = async () => {
  loading.value = true;
  
  // Save the scroll position before loading new comics
  scrollPos.value = document.querySelector(".section-timeline")?.scrollLeft || 0;

  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("https://gateway.marvel.com/v1/public/comics", {
    // Initiates a try-catch block and makes a GET request to the Marvel API.

    // Define request parameters including limit, API key, timestamp, hash, selected event ID, and order.
      params: {
        limit: 100,
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
        events: events[selectedEvent.value],
        orderBy: "-focDate"
      },
    });
 // Map the response results to a simpler format and assign to marvelComics.
    marvelComics.value = response.data.data.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
    console.log("Comics loaded:", marvelComics.value);
  } catch (error) {
    console.error(`Error fetching comics for ${selectedEvent.value}:`, error);
  } finally {
    loading.value = false;

    // Restore the scroll position AFTER loading
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

onMounted(() => {
  fetchMarvelComics();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for changes in selectedEvent and call fetchMarvelComics when it changes
watch(selectedEvent, () => {
  fetchMarvelComics();
});

// New method to handle comic click
const goToWiki = (comicId) => {
  window.open(`https://marvel.com/comics/issue/${comicId}`, '_blank');
};
</script>

<template>
  <section class="section-timeline"> 
    <div class="section-timeline__container">     
      <div class="section-eventSelector">
        <p class="section-timeline__title">{{ selectedEvent }} comics</p>
        <select v-model="selectedEvent" class="section-timeline__select">
          <option v-for="(id, event) in events" :key="id" :value="event">{{ event }}</option>
          <!-- "event" represents the key (which is the event name) and "id" the value (event ID) in each iteration -->
        </select>
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="marvelComics.length === 0">Not found</div><!-- This line displays "Not found" if the marvelComics array is empty -->
      <div v-else class="section-timeline__comics">
        <div v-for="comic in marvelComics" :key="comic.id" class="comic-card" @click="goToWiki(comic.id)">
          <img :src="comic.image" :alt="comic.title" class="comic-card__image" />
          <p class="comic-card__title">{{ comic.title }}</p>
        </div>
      </div>
      <div class="section-timeline__buttons"> 
        <!-- Note: These buttons are currently not functional as the scrollLeft and scrollRight functions are commented out -->
        <button @click="scrollLeft" class="section-timeline__button section-timeline__button--left">⬅</button>
        <button @click="scrollRight" class="section-timeline__button section-timeline__button--right">➡</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-timeline {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 2rem;
  height: 100vh;
  background-image: url('@/assets/img/timelineBkg2.png');
  background-size: contain;
  background-repeat: repeat-x;
}

.section-eventSelector {
  position: sticky;
  left: 0; /* Stuck to the left edge */
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
  scroll-behavior: smooth;
}

.comic-card {
  flex: 0 0 auto;
  width: 12rem;
  opacity: 100%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.comic-card:hover {
  opacity: 80%;
  transform: scale(1.05);
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
</style>
