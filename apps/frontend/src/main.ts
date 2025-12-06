import { configure } from 'vee-validate'

import { createApp } from 'vue'

import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from './i18n/en.json' with { type: 'json' }
import router from './router'
import './assets/main.css'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
})

configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnModelUpdate: false,
  validateOnInput: false,
})

const app = createApp(App)

app.use(router)
app.use(i18n)

void router.isReady().then(() => {
  app.mount('#app')
})
