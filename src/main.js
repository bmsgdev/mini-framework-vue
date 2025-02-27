import './assets/main.css'
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from "./router/router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(Toast);
app.use(createPinia())
app.use(router);
app.mount("#app");
