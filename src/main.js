import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import '@/styles/index.scss'

import env from 'dotenv'
import {setToken} from './utils/auth'

setToken("INNER:123")

Vue.config.productionTip = false

env.config()

new Vue({
    el: "#app",
    render: handler => handler(App),
})
