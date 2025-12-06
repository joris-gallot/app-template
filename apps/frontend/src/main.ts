import { configure } from 'vee-validate'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnModelUpdate: false,
  validateOnInput: false,
})

const app = createApp(App)

app.use(router)

void router.isReady().then(() => {
  app.mount('#app')
})
