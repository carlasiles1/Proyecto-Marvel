<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/path-to-your-marvel-logo.png" alt="Marvel Logo" class="logo">
          <p>&copy; {{ currentYear }} Marvel Time Line</p>
        </div>
        <nav class="footer-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/linea-tiempo" class="nav-link">Línea de Tiempo</router-link>
          <router-link to="/contacto" class="nav-link">Contacto</router-link>
          <router-link to="/quiz" class="nav-link">Quiz</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
        <div class="social-icons">
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" target="_blank" class="social-icon"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(45deg, #202020, #3d3d3d);
  color: #fff;
  padding: 2rem 0;
  font-family: 'Arial', sans-serif;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.footer-logo {
  text-align: center;
}
.logo {
  width: 100px;
  margin-bottom: 0.5rem;
}
.footer-nav {
  display: flex;
  gap: 1rem;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #e62429;
}
.social-icons {
  display: flex;
  gap: 1rem;
}
.social-icon {
  color: #fff;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}
.social-icon:hover {
  transform: scale(1.2);
}
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
