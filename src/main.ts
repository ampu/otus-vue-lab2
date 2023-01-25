import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import installDirectives from '@/directives'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import './assets/main.scss'

const app = createApp(App)

installDirectives(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
