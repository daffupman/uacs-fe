import {computed, createApp} from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

axios.interceptors.request.use(config => {
    const token = computed(() => store.state.bearerToken)
    config.headers.common = {
        ...config.headers.common,
        authorization: token.value
    }
    return config
})

createApp(App).use(store).use(router).use(antd).mount('#app')
