import { createApp } from 'vue';
import App from './App.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import store from './store/index.js';

const app = createApp(App);
app.component('Datepicker', Datepicker);
app.use(store);
app.mount('#app')
