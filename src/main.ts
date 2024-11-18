import { createApp } from 'vue'
import './style.css'
import vtron from 'vtron'
import App from './App.vue'
import 'vtron/distlib/style.css'

createApp(App).use(vtron).mount('#app')
