import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Store from './stores'


createApp(App).use(Store).mount('#app')
