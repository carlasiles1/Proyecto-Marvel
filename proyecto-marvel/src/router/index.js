import { createRouter, createWebHistory } from "vue-router";

// Importamos HomeView directamente porque es la página principal
import HomeView from "../views/HomeView.vue";
import Aleeza from "../views/Aleeza.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/Aleeza", name: "Aleeza", component: Aleeza },
  { path: "/Alej", name: "Alej", component: () => import("../views/Alejandro.vue") },
  { path: "/carla/:id?", name: "Carla", component: () => import("../views/Carla.vue") },
  { path: "/Lucia", name: "Lucia", component: () => import("../views/Lu.vue") },
  { path: "/Najwa", name: "Najwa", component: () => import("../views/Najwa.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
