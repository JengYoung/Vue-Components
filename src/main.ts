import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@css/globalStyle.scss';
import globalCSS from './utils/globalCSS';

createApp(App).use(router).mount('#app');

console.log(globalCSS);
