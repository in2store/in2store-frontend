import VueRouter from 'vue-router'
import Vue from 'vue'

import EntryView from '@/views/layout/Layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'default',
            path: '/',
            redirect: '/eden/my/dashboard'
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login'),
        },
        {
            name: 'my',
            path: '/eden/my',
            meta: {title: '我的'},
            component: EntryView,
            children: [
                {
                    name: 'default',
                    path: '',
                    redirect: 'dashboard'
                },
                {
                    name: 'dashboard',
                    path: 'dashboard',
                    meta: {title: '仪表盘'},
                    component: () => import('@/views/my/dashboard')
                },
                {
                    name: 'role',
                    path: 'role',
                    meta: {title: '人物信息'},
                    component: () => import('@/views/my/role')
                },
                {
                    name: 'mails',
                    path: 'mails',
                    meta: {title: '邮件'},
                    component: () => import('@/views/my/mails')
                },
                {
                    name: 'skills',
                    path: 'skills',
                    meta: {title: '技能训练'},
                    component: () => import('@/views/my/skills')
                },
                {
                    name: 'favorites',
                    path: 'favorites',
                    meta: {title: '收藏夹'},
                    component: () => import('@/views/my/favorites')
                },
                {
                    name: 'notFound',
                    path: '*',
                    component: () => import('@/views/404')
                }
            ]
        },
        {
            name: 'eden',
            path: '/eden',
            component: EntryView,
            children: [
                {
                    name: 'default',
                    path: "",
                    redirect: '/eden/my/dashboard'
                },
                {
                    name: 'equipment',
                    path: 'equipment',
                    meta: {title: '舰船装配'},
                    component: () => import('@/views/equipment')
                },
                {
                    name: 'industry',
                    path: 'industry',
                    meta: {title: '工业生产'},
                    component: () => import('@/views/industry')
                },
                {
                    name: 'legion',
                    path: 'legion',
                    meta: {title: '军团'},
                    component: () => import('@/views/legion')
                },
                {
                    name: 'log',
                    path: 'log',
                    meta: {title: '任务记录'},
                    component: () => import('@/views/log')
                },
                {
                    name: 'map',
                    path: 'map',
                    meta: {title: '星图'},
                    component: () => import('@/views/map')
                },
                {
                    name: 'planet',
                    path: 'planet',
                    meta: {title: '行星开发'},
                    component: () => import('@/views/planet')
                },
                {
                    name: 'vault',
                    path: 'vault',
                    meta: {title: '库存'},
                    component: () => import('@/views/vault')
                },
                {
                    name: 'wallet',
                    path: 'wallet',
                    meta: {title: '钱包'},
                    component: () => import('@/views/wallet')
                },
                {
                    name: 'notFound',
                    path: '*',
                    component: () => import('@/views/404')
                }
            ]
        },
    ]
});
