<template>
  <section class="about">
    <!-- Logo at the top -->
    <div class="logo">
      <!-- Correct image path -->
      <img :src="logoSrc" alt="Logo">
    </div>

    <!-- Content section -->
    <div class="content">
      <div class="image">
        <img :src="imageSrc" alt="imagen">
      </div>
      <div class="text">
        <h1>About</h1>
        <p>
          Marvel Timeline es compleja y está llena de eventos interconectados.
          Comienza con la creación del universo y continúa con las aventuras de superhéroes
          como Iron Man, Captain America, y Spider Man. Cada película y serie encaja en una
          narrativa más grande que abarca décadas.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import the logo image
import logoSrc from '@/assets/img/logoTimeline.png';
import imageSrc from '@/assets/img/Background-footer.jpg';
</script>

<style scoped>
/* Section Styling */
.about {
  background-color: #000; /* Black background */
  color: #fff;
  padding: 100px 50px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  animation: fadeIn 1s ease-out;
  flex-direction: column; /* Stack logo and content */
}

/* Logo Styling */
/* Logo Styling */
.logo {
  position: absolute;
  top: 150px; /* Move logo lower */
  right: 60px; /* Move logo a bit left by increasing the right value */
  width: auto;
  height: 50px; /* Adjust logo size */
}




.logo img {
  width: auto;
  max-height: 100%; /* Ensure the logo scales proportionally */
  filter: brightness(70%);
  transition: filter 0.3s ease;
}

.logo img:hover {
  filter: brightness(100%);
  transform: scale(1.05);
}

/* Content Box */
.content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Dark content box */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  animation: slideUp 1s ease-out;
}

.content:hover {
  transform: scale(1.05);
}

/* Image Styling */
.image {
  flex: 1;
  text-align: center;
  padding-right: 30px;
  position: relative;
}

.image img {
  max-width: 100%;
  border-radius: 10px;
  filter: brightness(70%);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.image img:hover {
  filter: brightness(100%);
  transform: scale(1.05);
}

/* Text Styling */
.text {
  flex: 1;
  padding-left: 20px;
  text-align: left;
}

h1 {
  font-size: 2.5rem; /* Smaller font size */
  margin-bottom: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px; /* Slightly smaller letter spacing */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s ease;
}

h1:hover {
  transform: translateX(10px);
}

p {
  font-size: 1rem; /* Slightly smaller font size */
  line-height: 1.6;
  color: #e0e0e0;
  text-align: justify;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
}

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>