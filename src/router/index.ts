import { createRouter, type RouteRecordRaw, createWebHistory } from "vue-router";

const Layout = () => import("../layout/index.vue")
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect:'home',
        component: Layout,
        children: [
            {
                path: 'home',
                component: () => import("../views/home/index.vue")
            
        },
            {
                path: 'island',
                component: () => import("../views/island/index.vue")
            },
            {
                path: 'hotel',
                component: () => import('../views/hotel/index.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import("../views/login/index.vue")
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router