<template>
    <div id="app">
      <h1>Marvel vs Anime: Comparador de Personajes</h1>
      <div class="characters">
        <div class="marvel-character">
          <h2>Personaje Marvel</h2>
          <input v-model="marvelSearch" @input="searchMarvelCharacter" placeholder="Buscar personaje Marvel">
          <div v-if="marvelCharacter">
            <img :src="marvelCharacter.thumbnail.path + '.' + marvelCharacter.thumbnail.extension" :alt="marvelCharacter.name">
            <h3>{{ marvelCharacter.name }}</h3>
            <p>{{ marvelCharacter.description }}</p>
          </div>
        </div>
        <div class="anime-character">
          <h2>Personaje Anime</h2>
          <input v-model="animeCharacter.name" placeholder="Nombre del personaje de anime">
          <textarea v-model="animeCharacter.description" placeholder="DescripciÃ³n del personaje"></textarea>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import md5 from 'md5';
  
  export default {
    data() {
      return {
        marvelSearch: '',
        marvelCharacter: null,
        animeCharacter: {
          name: '',
          description: ''
        },
        marvelApiPublicKey: '18f637f0c4fe1c7cec046d95e7ebfe90',
        marvelApiPrivateKey: '46fc3f0c74c51b72ea9275e6ccc271e4566fca6c'
      }
    },
    methods: {
      searchMarvelCharacter() {
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + this.marvelApiPrivateKey + this.marvelApiPublicKey);
        
        axios.get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            nameStartsWith: this.marvelSearch,
            apikey: this.marvelApiPublicKey,
            ts: timestamp,
            hash: hash
          }
        })
        .then(response => {
          if (response.data.data.results.length > 0) {
            this.marvelCharacter = response.data.data.results[0];
          }
        })
        .catch(error => {
          console.error('Error fetching Marvel character:', error);
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .characters {
    display: flex;
    justify-content: space-around;
  }
  .marvel-character, .anime-character {
    width: 45%;
  }
  img {
    max-width: 100%;
  }
  </style>