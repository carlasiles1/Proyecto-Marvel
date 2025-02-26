import { createRouter, createWebHistory } from 'vue-router';
import MarvelHomeView from '../views/MarvelHomeView.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  routes: [
    {
      
      path: '/',
      redirect: '/marvelHome'
    },
{
      path: '/marvelHome',
      name: 'MarvelHome',
      component: MarvelHomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
  },
  ]
});

export default router;

