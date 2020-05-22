import Vue from 'vue'
// import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
// import Meta from 'vue-meta'

// Routes
import paths from './path'

function route (path, view, name) {
    return {
        name: name || view,
        path,
        component: (resovle) => import(
            `@/page/${view}.vue`
            ).then(resovle)
    }
}

Vue.use(Router)

// Create a new router
const router = new Router({
    mode: 'history',
    routes: paths.map(path => route(path.path, path.view, path.name)).concat([
        { path: '*', redirect: '/' }
    ]),
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    }
})

// Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
// if (process.env.GOOGLE_ANALYTICS) {
//   Vue.use(VueAnalytics, {
//     id: process.env.GOOGLE_ANALYTICS,
//     router,
//     autoTracking: {
//       page: process.env.NODE_ENV !== 'development'
//     }
//   })
// }

export default router




/*
import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const info = r => require.ensure([], () => r(require('@/page/info')), 'info');
const data = r => require.ensure([], () => r(require('@/page/data')), 'data');
const excuse = r => require.ensure([], () => r(require('@/page/excuse')), 'excuse');
const apply = r => require.ensure([], () => r(require('@/page/apply')), 'apply');
const message = r => require.ensure([], () => r(require('@/page/message')), 'message');
const news = r => require.ensure([], () => r(require('@/page/news')), 'news');
const rewriteInfo = r => require.ensure([], () => r(require('@/page/rewriteInfo')), 'rewriteInfo');
const index = r => require.ensure([], () => r(require('@/App')), 'index');

const routes = [
    { path: '*', component: index },
    {
        path:'/',
        component: index
    },
    {
        path: '/login',
        component: login
    }, {
        path: '/home',
        component: home,
    },{
        path:'/info',
        component: info,
    },{
        path:'/data',
        component: data,
    },{
        path:'/excuse',
        component: excuse,
    },{
        path:'/apply',
        component: apply,
    },{
        path:'/message',
        component: message,
    },{
        path:'/news',
        component: news,
    },{
        path:'/rewriteInfo',
        component: rewriteInfo,
    }
]

export default new Router({
    routes,
    mode:history,
    strict: process.env.NODE_ENV !== 'production',
})
*/
