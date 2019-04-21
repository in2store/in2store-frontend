import VueRouter from 'vue-router'
import Vue from 'vue'

import EntryView from '@/views/layout/Layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'default',
            path: '/',
            redirect: {
                name: 'login'
            }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login'),
        },
        {
            name: 'userInfo',
            path: '/users/:userID',
            component: EntryView,
            children: [
                {
                    name: 'default',
                    path: "",
                    meta: {title: '用户信息'},
                    component: () => import('@/views/user')
                },
                {
                    name: 'book',
                    path: 'books/:bookID',
                    meta: {title: '书籍信息'},
                    component: () => import('@/views/book')
                },
                {
                    name: 'bookPage',
                    path: 'books/:bookID/*',
                    meta: {title: '书籍详情'},
                    component: () => import('@/views/bookPage')
                }
            ]
        },
        {
            name: 'notFound',
            path: '*',
            component: () => import('@/views/404')
        },
    ]
});
