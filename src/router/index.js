import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'



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
             path: '/book', name: 'book', component: () => import('../views/book/index'),
            },
            {
                path: '/user', name: 'user', component: () => import('../views/user/index') //用户管理
            },
            { path: '/mall', name: 'mall', component: () => import('../views/mall/index'),


            
            beforeEnter: (to, from, next) => {
                let userA = store.state.userinfo.userinfo.isA
                // console.log(store.state.userinfo.userinfo.isA);
                if(!userA){
                    alert('非法请求！')
                    next('/')
                }else{
                    next()
                }
            }
        }, //借阅管理
        
        
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
    // mode:'history',//不带#
    mode:'history',
    routes
})


export default router
