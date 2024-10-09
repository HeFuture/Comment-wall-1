import { createApp } from 'vue'
import './styles/commons.scss'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

// 注册自己的组件
import YiKe from './components/Yike/index.js'

const app= createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.use(YiKe)
app.mount('#app')
 