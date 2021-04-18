import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

createApp(App).use(store).use(router).use(antd).mount('#app')
