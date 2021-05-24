import {computed, createApp} from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

axios.interceptors.request.use(config => {
    const token = computed(() => store.state.bearerToken)
    config.headers.authorization = token.value
    return config
})

axios.interceptors.response.use(config => {
    console.log(config)
    if (config.data.code === 401) {
        // store.commit('setBearerToken', '')
        // store.commit("setUser", {})
        router.replace('/')
    }
    return config
}, err => {
    console.log("err")
    console.log(err)
    return Promise.reject(err.data.data.msg)
})

createApp(App).use(store).use(router).use(antd).mount('#app')
