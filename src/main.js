import './assets/main.css'
import VScrollLock from 'v-scroll-lock'
import VueBodyScrollLock from 'vue-body-scroll-lock';
 
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';
axios.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*'; // Это позволит использовать любой origin
  // Другие заголовки CORS могут быть добавлены здесь
  return config;
});
const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(VScrollLock)
app.use(VueBodyScrollLock);

app.mount('#app')
