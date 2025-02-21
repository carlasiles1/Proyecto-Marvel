<template>
    <div class="view-Lucia">
      <h1>Lucia</h1>
      <!-- Usamos el componente importado -->
      <ComponentLu />
    </div>
  </template>
  
  <script>
  // Importamos el componente
  import ComponentLu from "../components/componentLu.vue";
import ComponentLu from "../components/ComponentLu.vue";
  
  export default {
    // Registramos el componente localmente
    components: {
      ComponentLu,
    },
  };
  </script>
  
  <style scoped>
  /* Agregamos algunos estilos básicos */
  .view-Lucia {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8
}