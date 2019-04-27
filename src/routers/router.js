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
            component: () => import('@/views/user')
        },
        {
            name: 'createBook',
            path: '/users/:userID/new/book',
            component: () => import('@/views/createBook')
        },
        {
            name: 'books',
            path: '/users/:userID/books',
            component: EntryView,
            children: [
                {
                    name: 'book',
                    path: ':bookID',
                    meta: {title: '书籍信息'},
                    component: () => import('@/views/book'),
                },
                {
                    name: 'bookPage',
                    path: ':bookID/*',
                    meta: {title: '书籍详情'},
                    component: () => import('@/views/bookPage'),
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
