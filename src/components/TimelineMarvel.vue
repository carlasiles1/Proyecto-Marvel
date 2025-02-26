<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import md5 from "md5";

// Variables reactivas
const marvelImages = ref([]);
const containerRef = ref(null);

// Claves de la API (Usa variables de entorno en .env)


const marvelApiPublicKey = process.env.VUE_APP_MARVEL_API_PUBLIC;
const marvelApiPrivateKey = process.env.VUE_APP_MARVEL_API_PRIVATE;


// Obtener imágenes de Marvel
const fetchMarvelImages = async () => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {
    const response = await axios.get("https://gateway.marvel.com/v1/public/comics", {
      params: {
        limit: 10, // Carga 10 comics
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
      },
    });

    // Verificar la respuesta y los datos
    console.log(response.data);

    // Extraer las imágenes de los personajes
    marvelImages.value = response.data.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    }));
  } catch (error) {
    console.error("Error al obtener imágenes de Marvel:", error);
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

// Cargar imágenes al montar el componente
onMounted(fetchMarvelImages);
</script>

<template>
  <section class="sectionTimeLine"> 
  <div class="timeline-container">
   
    <div ref="containerRef" class="timeline">
      <div v-for="character in marvelImages" :key="character.id" class="character-card">
        <img :src="character.image" :alt="character.name" /> <!--verificar aqui datos de la api para el alt-->
       
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
.timeline-container {
  display: flex;
 
 /* position: relative;*/
  width: 100%;
 /* overflow: hidden;*/
  margin-top: 20rem;
  margin-bottom: 20rem;
  flex-direction: column;
  /*overflow-x: visible;*/
}

.timeline {
  display: flex;
  gap: 6rem;
 /* overflow-x: auto;*/
  /*scroll-behavior: smooth;*/
  padding: 3rem;
  /*max-width: 100%;*/
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

.timeLineButtons{
  
  display: flex;
  justify-content: space-between;
  padding-inline: 6rem;
  
  }

  .sectionTimeLine{
    background-image: url('@/assets/img/timelineBkg2.png');
    background-size:contain;
    background-repeat:repeat-x;
    
  



  }
</style>

