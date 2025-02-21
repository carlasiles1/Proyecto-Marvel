<template>
    <div class="view-Najwa">
      <h1>Najwa</h1>
      <!-- Usamos el componente importado -->
      <ComponentNajwa />
    </div>
  </template>
  
  <script>
  // Importamos el componente
  import ComponentNajwa from "../components/componentNajwa.vue";
import ComponentNajwa from "../components/ComponentNajwa.vue";
  
  export default {
    // Registramos el componente localmente
    components: {
      ComponentNajwa,
    },
  };
  </script>
  
  <style scoped>
  /* Agregamos algunos estilos básicos */
  .view-carla {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8
}