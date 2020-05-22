/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

// Relative to /src/page
export default [
    {
        path: '/login',
        name:"login",
        view: "login"
    }, {
        path: '/home',
        name:"home",
        view: "home",
    },{
        path:'/info',
        name:"info",
        view: "info",
    },{
        path:'/data',
        name:"data",
        view: "data",
    },{
        path:'/excuse',
        name:"excuse",
        view: "excuse",
    },{
        path:'/apply',
        name:"apply",
        view: "apply",
    },{
        path:'/message',
        name:"message",
        view: "message",
    },{
        path:'/news',
        name:"news",
        view: "news",
    },{
        path:'/rewriteInfo',
        name:"rewriteInfo",
        view: "rewriteInfo",
    },{
        path:'/admin',
        name:"admin",
        view: "admin",
    },{
        path:'/adminData',
        name:"adminData",
        view: "adminData",
    },
    {
        path:'/apiTop',
        name:"apiTop",
        view: "apiTop",
    },
    {
        path:'/attSum',
        name:"attSum",
        view: "attSum",
    },
    {
        path:'/exPerson',
        name:"exPerson",
        view: "exPerson",
    },
    {
        path:'/applyList',
        name:"applyList",
        view: "applyList",
    }

];