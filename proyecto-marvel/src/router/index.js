import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Aleeza from '../views/Aleeza.vue'
// Crea el enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usa historial del navegador
  routes: [
    {
      path: '/', // Ruta raíz
      name: 'home', // Nombre de la ruta
      component: HomeView, // Componente asociado
    },
    {
      path: '/Aleeza', // Ruta para Aleeza
      name: 'Aleeza',
      component: Aleeza,
    },
    {
      path: '/Alej', // Ruta para Alej
      name: 'Alej',
      component: () => import('../views/Alejandro.vue'), // Lazy-loading
    },
    {
      path: '/carla/:id?', // Ruta para Carla
      name: 'carla',
      component: () => import('../views/Carla.vue'), // Lazy-loading
    },
    {
      path: '/Lucia', // Ruta para Lucia
      name: 'Lucia',
      component: () => import('../views/Lu.vue'), // Lazy-loading
    },
    {
        path: '/Najwa', // Ruta para Najwa
        name: 'Najwa',
        component: () => import('../views/Najwa.vue'), // Lazy-loading
      },
  ],
});

export default router; // Exporta el enrutador