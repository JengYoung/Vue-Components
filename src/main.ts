import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import "@css/normalize.css";
import "@/css/global.scss"

import globalCSS from './utils/globalCSS';

console.log(globalCSS)

createApp(App).use(store).use(router).mount('#app');
