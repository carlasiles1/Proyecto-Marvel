<template>
  <div class="marvel-events">
    <h1>Eventos de Marvel</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p class="total-events">Número total de eventos: {{ totalEvents }}</p>
      <ul class="event-list">
        <li v-for="event in events" :key="event.id" class="event-item">
          <h2>{{ event.title }}</h2>
          <p class="event-id">ID: {{ event.id }}</p>
          <img :src="`${event.thumbnail.path}.${event.thumbnail.extension}`" :alt="event.title" class="event-image">
          <p>{{ event.description || 'No hay descripción disponible.' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5';

export default {
  data() {
    return {
      publicKey: 'c6505251612e731238b4d32531d6a998',
      privateKey: 'ee80321c4497db2e446a64fb6b78d032066c80e1',
      events: [],
      totalEvents: 0,
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      const timestamp = new Date().getTime();
      const hash = md5(timestamp + this.privateKey + this.publicKey);
      const url = `https://gateway.marvel.com/v1/public/events?ts=${timestamp}&apikey=${this.publicKey}&hash=${hash}&limit=73`;

      axios.get(url)
        .then(response => {
          this.events = response.data.data.results;
          this.totalEvents = response.data.data.total;
          this.loading = false;
        })
        .catch(error => {
          this.error = 'Error al cargar los eventos: ' + error.message;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.marvel-events {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #e23636;
  text-align: center;
}

.loading, .error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.total-events {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.event-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.event-item:hover {
  transform: translateY(-5px);
}

.event-item h2 {
  background-color: #e23636;
  color: white;
  margin: 0;
  padding: 10px;
  font-size: 18px;
}

.event-id {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  padding: 0 10px;
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-item p {
  padding: 10px;
  font-size: 14px;
}
</style>
