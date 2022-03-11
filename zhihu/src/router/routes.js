import Home from '@/views/Home'

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: ()=> import(/* webpackChunkName:"detail" */'@/views/Detail')
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import(/* webpackChunkName:"person" */'@/views/Login')
    },
    {
        path: '/person',
        name: 'Person',
        component: ()=> import(/* webpackChunkName:"person" */'@/views/Person')
    },
    {
        path: '/store',
        name: 'store',
        component: ()=> import(/* webpackChunkName:"person" */'@/views/Store')
    },
    {
        path: '/update',
        name: 'update',
        component: ()=> import(/* webpackChunkName:"person" */'@/views/Update')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]