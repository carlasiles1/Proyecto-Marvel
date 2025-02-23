<template>
  <div class="view-Carla">
    <componentCarla />
  </div>
</template>

<script>
// Importamos el componente con el nombre correcto
import ComponentCarla from "../components/componentCarla.vue";

export default {
  name: "Carla",
  components: {
    componentCarla,
  },
};
</script>

