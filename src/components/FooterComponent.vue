<template>
  <footer v-show="showFooter" class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/img/Marvel Logo.png" alt="Marvel Logo" class="logo">
        </div>
        <div class="footer-nav">
          <router-link v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link">
            {{ link.text }}
          </router-link>
        </div>
        <div class="social-icons">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" class="social-icon">
            <font-awesome-icon :icon="['fab', social.icon]" />
          </a>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p class="copyright">&copy; {{ currentYear }} Marvel. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const currentYear = ref(new Date().getFullYear());
const showFooter = ref(false);

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/linea-tiempo', text: 'Time Line' },
  { to: '/contacto', text: 'Contact' },
  { to: '/about', text: 'About' },
  { to: '/quiz', text: 'Quiz' }

];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/Marvel', icon: 'facebook-f' },
  { name: 'Twitter', url: 'https://twitter.com/Marvel', icon: 'twitter' },
  { name: 'Instagram', url: 'https://www.instagram.com/marvel', icon: 'instagram' }
];

const handleMouseMove = (event) => {
  const windowHeight = window.innerHeight;
  const mouseY = event.clientY;
  showFooter.value = mouseY > windowHeight - 100;
};

watch(showFooter, (newValue) => {
  if (newValue) {
    document.querySelector('.footer').style.transform = 'translateY(0)';
  } else {
    document.querySelector('.footer').style.transform = 'translateY(100%)';
  }
});

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.footer {
  background: linear-gradient(45deg, #070215, #3d3d3d);
  color: #fff;
  padding: 0.5rem 0 0.5rem;
  font-family: 'Arial', sans-serif;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  transition: transform 0.3s ease;
  transform: translateY(100%);
}

.footer::before,
.footer::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-image: url('@/assets/img/Background-footer.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  transition: transform 0.5s ease;
}

.footer::before {
  left: -250px;
  bottom: -250px;
}

.footer::after {
  right: -250px;
  top: -250px;
}

.footer:hover::before {
  transform: translate(20px, -20px);
}

.footer:hover::after {
  transform: translate(-20px, 20px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  margin-top: 1.6rem;
}

.logo {
  width: 3rem;
  transition: transform 0.3s ease;
  margin-left: 7rem;
}

.logo:hover {
  transform: scale(1.1);
}

.footer-nav {
  display: flex;
  justify-content: center;
  margin-right: 3.5rem;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  font-weight: bold;
  font-size: 1.1rem;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #e62429;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #e62429;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  width: 100%;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  margin-left: 1rem;
}

.social-icon {
  color: #fff;
  font-size: 1.7rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-icon:hover {
  color: #e62429;
  transform: scale(1.2) rotate(5deg);
}

.copyright {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-right: 1.3rem;
}

@media (max-width: 768px) {

}
</style>
