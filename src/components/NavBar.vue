<template>
  <header class="navbar-container">
    <nav class="nav">
      <ul class="nav-list">
        <li><router-link to="/">HOME</router-link></li>
        <li><router-link to="/About">ABOUT</router-link></li>
        <li><router-link to="/TimeLine">TIME LINE</router-link></li>
        <li><router-link to="/Quiz">QUIZ</router-link></li>
        <li><router-link to="/Contact">CONTACT</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
/* Contenedor general */
.navbar-container {
  width: 100%;
  z-index: 1000;
  background-image: transparent;
  padding: 15px 0;
  position: absolute;
}

/* Barra de navegación */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* Línea blanca semitransparente */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Sombra sutil debajo */
}

/* Lista de navegación */
.nav-list {
  list-style: none;
  display: flex;
  gap: 100px;
}

/* Estilo de los enlaces */
.nav-list li {
  text-transform: uppercase;
}

.nav-list router-link {
  text-decoration: none;
  color:white;
  font-size: 16px;
  font-weight: bold;
}

</style>
