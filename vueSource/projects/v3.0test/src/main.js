import { createApp } from 'vue'
import App from './App2.vue'
import './index.css'
import Store from './stores'
import router from './router'


createApp(App).use(router).use(Store).mount('#app')
