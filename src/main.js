import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { VueRecaptchaPlugin } from 'vue-recaptcha'
import './style.css'
import App from './App.vue'

const head = createHead()

const app = createApp(App)

app.use(head)
app.use(VueRecaptchaPlugin, {
  v2SiteKey: '6LdQzakmAAAAABC9KVmdi8N2783z0W7aZXATev8K',
})

app.mount('#app')
