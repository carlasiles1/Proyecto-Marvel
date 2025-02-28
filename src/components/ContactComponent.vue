<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelCharacters = ref([]);
const currentCharacterIndex = ref(0);
const currentCharacter = ref(null);
const isLoading = ref(true); // Indicador de carga
let intervalId = null;

// Claves de la API
const marvelApiPublicKey = process.env.VUE_APP_MARVEL_API_PUBLIC;
const marvelApiPrivateKey = process.env.VUE_APP_MARVEL_API_PRIVATE;

// Precargar imágenes
const preloadImages = (characters) => {
  characters.forEach((character) => {
    const img = new Image();
    img.src = character.image;
  });
};

// Obtener personajes de Marvel
const fetchMarvelCharacters = async () => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("https://gateway.marvel.com/v1/public/characters", {
      params: {
        limit: 10, // Obtener varios personajes para rotar
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
      },
    });

    // Extraer los datos de los personajes
    marvelCharacters.value = response.data.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    }));

    // Precargar las imágenes
    preloadImages(marvelCharacters.value);

    // Mostrar el primer personaje
    if (marvelCharacters.value.length > 0) {
      currentCharacter.value = marvelCharacters.value[0];
    }

    // Iniciar el cambio de imágenes cada 3 segundos
    startImageRotation();
    isLoading.value = false; // Termina la carga

  } catch (error) {
    console.error("Error al obtener personajes de Marvel:", error);
    isLoading.value = false; // Termina la carga en caso de error
  }
};

// Función para cambiar de personaje cada 3 segundos
const startImageRotation = () => {
  intervalId = setInterval(() => {
    if (marvelCharacters.value.length > 0) {
      currentCharacterIndex.value = (currentCharacterIndex.value + 1) % marvelCharacters.value.length;
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
  <main>
    <!-- Formulario a la izquierda -->
    <form id="formulario">
      <div class="form-group">
        <label for="nombre">Name:</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="mensaje">Message:</label>
        <textarea id="mensaje" name="mensaje" required></textarea>
      </div>
    </form>

    <!-- Sección de personajes a la derecha -->
    <div class="timeline-container-characters">
      <div class="timeline-characters">
        <div v-if="!isLoading && currentCharacter" class="character-card">
          <img :src="currentCharacter.image" :alt="currentCharacter.name" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
main {
  background-color: #191129;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

label {
  color: white;
}

#textarea {
  width: 100%;
  height: 100px;
}
#mensaje{
  background-color: #191129;

}
#email{
  background-color: #191129;
}
#nombre{
  background-color: #191129;
}

/* Contenedor de personajes */
.timeline-container-characters {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 50%;
  overflow: hidden;
}

.timeline-characters {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.character-card {
  width: 20rem;
  opacity: 100%;
}

.character-card:hover {
  opacity: 80%;
}

.character-card img {
  width: 100%;
  border-radius: 8px;
}
</style>
