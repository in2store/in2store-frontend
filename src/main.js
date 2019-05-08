import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import '@/styles/index.scss'

import env from 'dotenv'

Vue.config.productionTip = false

env.config()

new Vue({
    el: "#app",
    render: handler => handler(App),
})
