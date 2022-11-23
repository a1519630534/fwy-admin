import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui';
// import { Button, Input,Container } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store'
import Cookie from 'js-cookie'

import * as API from '@/api'
Vue.prototype.$API = API
//全局前置导航守卫
router.beforeEach((to,from,next)=>{
  //token
  const token = Cookie.get('token')
  //如果token不存在并且不在登录页面跳转到登录页面
   if(!token && to.name !== 'login'){
    next({ name:'login'})
   } 
   //如果token存在并且在登录页面，跳转到首页
   else if(token && to.name === 'login'){
    next({name:'home'})
   }else{
    next()
   }
})

Vue.config.productionTip = false

// Vue.use(Button)
Vue.use(ElementUI)
// Vue.use(Input)
// Vue.use(Container)

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
