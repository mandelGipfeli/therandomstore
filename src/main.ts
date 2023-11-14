import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import * as Router  from 'vue-router'
import { routes } from './routes'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
const pinia = createPinia()

const router = Router.createRouter({
    history: Router.createWebHashHistory(),
    routes
  })

app.use(router)
app.use(pinia)
app.mount('#app')

pinia.use(piniaPluginPersistedstate)

