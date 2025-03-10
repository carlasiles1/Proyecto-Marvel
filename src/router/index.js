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
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuizView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
},
  ]
});

export default router;

