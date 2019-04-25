import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_uri
    baseURL: 'http://service-in2-gateway.in2store.service.profzone.net/in2-gateway', // api 的 base_uri
    timeout: 5000, // 请求超时时间
})
service.defaults.headers.common['Content-Type'] = 'application/json'
service.defaults.headers.get['Content-Type'] = 'application/json'
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'
service.defaults.headers.patch['Content-Type'] = 'application/json'
service.defaults.headers.delete['Content-Type'] = 'application/json'

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        let message = '系统内部错误'
        if (error.response) {
            const res = error.response.data
            if (res.canBeTalkError) {
                message = res.msg
            }
        }
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
