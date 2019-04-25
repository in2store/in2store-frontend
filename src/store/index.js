import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import book from './modules/book'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        book,
    },
    getters
})

export default store
