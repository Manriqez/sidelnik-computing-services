import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import toastification from "vue-toastification";
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import "vue-toastification/dist/index.css";


createApp(App).use(store).use(router).use(toastification, { 
    transition: "Vue-Toastification__bounce",
    maxToasts: 10,
    newestOnTop: true
}).mount("#app");
