import VueRouter from 'vue-router'
import Vue from 'vue'

import CategoryView from '@/views/category'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'default',
            path: '/',
            meta: {title: '精选 · In2.Store'},
            component: CategoryView,
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login'),
            meta: {
                title: '登录 · In2.Store',
            },
        },
        {
            name: 'userInfo',
            path: '/users/:userID',
            component: () => import('@/views/user'),
            meta: {
                title: '用户 · In2.Store',
            },
        },
        {
            name: 'createBook',
            path: '/new/book',
            component: () => import('@/views/createBook'),
            meta: {
                title: '创建文档 · In2.Store',
            },
        },
        {
            name: 'books',
            path: '/users/:userID/books',
            component: () => import('@/views/layout/Layout'),
            children: [
                {
                    name: 'book',
                    path: ':bookID',
                    meta: {title: '书籍信息 · In2.Store'},
                    component: () => import('@/views/book'),
                },
                {
                    name: 'bookPage',
                    path: ':bookID/*',
                    meta: {title: '书籍详情 · In2.Store'},
                    component: () => import('@/views/bookPage'),
                }
            ]
        },
        {
            name: 'category',
            path: '/cat/:categoryName',
            meta: {title: '分类 · In2.Store'},
            component: CategoryView,
        },
        {
            name: 'notFound',
            path: '*',
            component: () => import('@/views/not-found')
        },
    ]
})

router.beforeEach((to, form, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

export default router
