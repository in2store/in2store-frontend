import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import '@/styles/index.scss'

Vue.config.productionTip = false

new Vue({
    el: "#app",
    render: handler => handler(App),
})
