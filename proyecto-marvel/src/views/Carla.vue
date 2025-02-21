<template>
    <div class="view-Carla">
      <h1>Carla</h1>
      <!-- Usamos el componente importado -->
      <ComponentCarla />
    </div>
  </template>
  
  <script>
  // Importamos el componente
  import ComponentCarla from "../components/ComponentCarla.vue";
  
  export default {
    // Registramos el componente localmente
    components: {
      ComponentCarla,
    },
  };
  </script>
