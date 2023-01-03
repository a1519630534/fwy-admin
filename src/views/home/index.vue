<template>

   <!-- <h1 style="margin: 0 auto;">欢迎来到图书管理系统</h1> -->
   <div>
      <div style="float: left;">
         <el-card shadow="always" :body-style="{ padding: '20px' }" style="height: 500px;width: 500px;">
            <div slot="header">
               <span style="padding-left: 176px;">用户信息</span>
            </div>
            <!-- card body -->
            <img :src="userImg" alt="" style="height: 100px;width: 100px;padding-left: 160px;">
            <h2 style="padding-left: 120px;">欢迎回来！{{ username }}</h2>
         </el-card>
      </div>

      <!-- <div style="width: 400px;float: left;margin-left: 20px;">
         <el-card>
            <div>
               列表内容
            </div>
         </el-card>
      </div> -->
   </div>

</template>

<script>
import Cookie from 'js-cookie';
// import * as echarts from 'echarts'
export default {
   name: 'Home',
   data() {
      return {
         userImg: require('../../assets/logo.png'),
         username:''

      };

   },
   mounted() {
      //存储用户名
      this.username = Cookie.get('username')

      
      // this.$store.dispatch('getInfo', data.data.username)
   },
   


}
</script>

</style>