<template>
    <div class="navbar-container">
      <nav>
        <ul class="nav-list">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/carla">Carla</router-link></li>
          <li><router-link to="/Aleeza/Aleeza">Aleeza</router-link></li>
          <li><router-link to="/Alejandro">Alejandro</router-link></li>
          <li><router-link to="/Lucia">Lucia</router-link></li>
          <li><router-link to="/Najwa">Najwa</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "Nav",
  };
  </script>
  
  <style scoped>
  
  .navbar-container {
    width: 100%; 
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000; 
    background-color: #681717; 
  }
  
  nav {
    display: flex;
    justify-content: center; 
    padding: 1rem 0; 
  }
  
  .nav-list { 
    list-style: none; 
    display: flex;
    gap: 2rem; 
  }
  
  .nav-list li a {
    text-decoration: none; 
    color: white; 
    font-size: 1rem; 
    transition: color 0.3s ease; 
  }
  
  .nav-list li a:hover {
    color: #f7e189; 
    font-weight: 800;
  }
  </style>