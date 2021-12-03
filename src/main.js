import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from './vuePlugins/antd'

const vue3app =  createApp(App)

vue3app.use(router).use(store).use(antd).mount('#app')
