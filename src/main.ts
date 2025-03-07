import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './premission'
import 'element-plus/dist/index.css'
import './style.css'

import App from './App.vue'
import router from './router'
import pinia from './store'
import { zhCn } from 'element-plus/es/locales.mjs'
const app = createApp(App)

app.use(ElementPlus,{locale:zhCn})
app.use(router)
app.use(pinia)
app.mount('#app')