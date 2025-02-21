<!-- App.vue -->

<template>
  <div id="app">
    <Nav />

  <router-view></router-view>
</div>
</template>
<script>
import { ref } from "vue";
import Nav from "./components/Nav.vue";


export default {
  name: "App",
  components: { Nav }, 
  setup() {

    const mostrarContenido = ref(false); //para que no salga el contenido del router

    // Devolver los datos y funciones al template
    return {
      mostrarContenido
    };
  },
};
</script>
<style>
/* Estilos generales */
#app {
  font-family: Arial, sans-serif;
  margin: 0 auto; /* Elimina el margen externo */
  padding: 0; /* Elimina el relleno externo */
  box-sizing: border-box;
}

</style>