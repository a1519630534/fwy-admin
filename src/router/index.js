import Vue from "vue";
import VueRouter from "vue-router";



Vue.use(VueRouter)

const routes = [
    //总路由
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/main.vue'),
        //重定向
        redirect: '/login',
        children: [
            //子路由
            {
                path: '/home', name: 'home', component: () => import('../views/home/index'),  //首页

            },
            {
                path: '/user', name: 'user', component: () => import('../views/user/index') //用户管理
            },
            { path: '/mall', name: 'mall', component: () => import('../views/mall/index') }, //商品管理
        ],
       
    },
    {
         path: '/login', name: 'login', component: () => import('../views/login.vue')
    },
//     {
//         path: '/mall', name: 'mall', component: () => import('../views/mall/index')
//    }

]



const router = new VueRouter({
    routes
})


export default router
