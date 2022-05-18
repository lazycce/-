import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import '@/assets/styles/global.css'
import '@/assets/styles/common.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'

// highlight
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(store)
app.use(ElementPlus, {locale})
app.use(router)
app.use(hljsVuePlugin)

app.mount('#app')
