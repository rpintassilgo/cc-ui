import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Toaster from "@meforma/vue-toaster";

import PrimeVue from "primevue/config";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import 'primevue/resources/themes/saga-blue/theme.css';  // Import your chosen theme
import 'primevue/resources/primevue.min.css';            // Core CSS

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"

const app = createApp(App)

const serverBaseUrl = import.meta.env.VITE_APP_BASE_URL
const iconURL = import.meta.env.VITE_ICON_URL
const taskAPIKey = import.meta.env.VITE_TASK_API_KEY
app.provide('axios', axios.create({
    baseURL: serverBaseUrl,
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true
  }))
app.provide('serverBaseUrl', serverBaseUrl)  
app.provide('iconURL', iconURL)  
app.provide('taskAPIKey', taskAPIKey)  

app.use(Toaster, {
    // Global/Default options
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
})

app.provide('toast', app.config.globalProperties.$toast);
app.use(PrimeVue);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);

app.use(createPinia())
app.use(router)

app.mount('#app')
