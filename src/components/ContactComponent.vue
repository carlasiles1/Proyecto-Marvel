<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelCharacters = ref([]);
const currentCharacterIndex = ref(0);
const currentCharacter = ref(null);
let intervalId = null;

// Claves de la API
const marvelApiPublicKey = process.env.VUE_APP_MARVEL_API_PUBLIC;
const marvelApiPrivateKey = process.env.VUE_APP_MARVEL_API_PRIVATE;

// IDs de los personajes principales
const avengersIds = [
  1009351, // Iron Man
  1009220, // Capitán América
  1009664, // Thor
  1009350, // Hulk
  1009610, // Spider-Man
  1009652, // Thanos
  1009368, // IronMan
];

// Obtener personajes de Marvel
const fetchMarvelCharacters = async () => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const promises = avengersIds.map(async (id) => {
      const response = await axios.get("https://gateway.marvel.com/v1/public/characters", {
        params: {
          id,
          apikey: marvelApiPublicKey,
          ts: timestamp,
          hash: hash,
        },
      });
      return response.data.data.results[0];
    });

    const results = await Promise.all(promises);

    // Filtrar personajes sin imagen o con datos incorrectos
    marvelCharacters.value = results
      .filter(
        (character) =>
          character &&
          character.thumbnail.path !==
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      )
      .map((character) => ({
        id: character.id,
        name: character.name,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      }));

    // Mostrar el primer personaje
    if (marvelCharacters.value.length > 0) {
      currentCharacter.value = marvelCharacters.value[0];
    }

    // Iniciar el cambio de imágenes cada 3 segundos
    startImageRotation();
  } catch (error) {
    console.error("Error al obtener personajes de Marvel:", error);
  }
};

// Cambiar personaje cada 3 segundos
const startImageRotation = () => {
  intervalId = setInterval(() => {
    if (marvelCharacters.value.length > 0) {
      currentCharacterIndex.value =
        (currentCharacterIndex.value + 1) % marvelCharacters.value.length;
      currentCharacter.value = marvelCharacters.value[currentCharacterIndex.value];
    }
  }, 3000);
};

// Detener el intervalo al desmontar el componente
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

// Cargar personajes al montar el componente
onMounted(fetchMarvelCharacters);
</script>

<template>
  <main class="contact">
    <div class="contact__wrapper">
      <!-- Formulario -->
      <form class="contact__form">
        <h1 class="contact__title">Contact</h1>
        <p class="contact__message">Leave us a message!</p>
        <div class="contact__group">
          <label class="contact__label" for="nombre">Name:</label>
          <input class="contact__input" type="text" id="nombre" name="nombre" required />
        </div>
        <div class="contact__group">
          <label class="contact__label" for="email">E-mail:</label>
          <input class="contact__input" type="email" id="email" name="email" required />
        </div>
        <div class="contact__group">
          <label class="contact__label" for="mensaje">Message:</label>
          <textarea class="contact__textarea" id="mensaje" name="mensaje" required></textarea>
        </div>
      </form>

      <!-- Sección de personajes -->
      <div class="timeline">
        <div class="timeline__characters">
          <div v-if="currentCharacter" class="timeline__card">
            <img
              class="timeline__image"
              :src="currentCharacter.image"
              :alt="currentCharacter.name"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Estilos generales */
main {
  background-color: #191129;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -0.5rem;
}

.contact__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}

/* Formulario de contacto */
.contact__form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
}

.contact__title {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: left;
}

.contact__message {
  color: white;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.contact__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
}

.contact__label {
  color: white;
  margin-bottom: 5px;
}

.contact__input,
.contact__textarea {
  background-color: #191129;
  width: 100%;
  max-width: 350px;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  font-size: 16px;
}

.contact__textarea {
  height: 100px;
  resize: none;
}

/* Timeline de personajes */
.timeline {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 50%;
  overflow: hidden;
}

.timeline__characters {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 400px;
  height: auto;
}

.timeline__card {
  width: 25rem;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
}

.timeline__card:hover {
  opacity: 80%;
}

.timeline__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
