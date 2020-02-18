import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";


Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainPage,
            meta: {title: 'Main Page', requiresAuth: true},
        },
        {
            path: '/auth',
            component: LoginPage,
            meta: {title: 'Authentication Page'},
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/auth',
                params: {nextUrl: to.fullPath}
            })
        }
    }
    next()
});

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router

