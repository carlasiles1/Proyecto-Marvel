import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importamos el router
import "./style.css";

const app = createApp(App);
app.use(router);
app.mount("#app"); // Corregido: Se monta solo una vez
