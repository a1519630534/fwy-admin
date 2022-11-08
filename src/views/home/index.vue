<template>

   <el-row class="home" :gutter="20">
      <!-- 用户详情 -->
      <el-col :span="8" style="margin-top: 20px;height: 460px;">
         <el-card shadow="hover">
            <div class="user">
               <img :src="userImg" />
               <div class="userInfo">
                  <p class="name">Admin</p>
                  <p class="access">超级管理员</p>
               </div>
               <div class="loginInfo">
                  <p>上次登录时间: <span>2021-7-6</span></p>
                  <p>上次登录地点: <span>武汉</span></p>
               </div>
            </div>
         </el-card>
         <!-- 数据展示 -->
         <el-card style="margin-top: 20px;height: 460px;" shadow="hover">
            <el-table :data="tableData" stripe style="width: 100%">
               <el-table-column prop="name" label="名称" width="150">
               </el-table-column>
               <el-table-column prop="todayBuy" label="日购买" width="130">
               </el-table-column>
               <el-table-column prop="monthBuy" label="月购买" width="100">
               </el-table-column>
               <el-table-column prop="totalBuy" label="总购买" width="100">
               </el-table-column>
            </el-table>
         </el-card>
      </el-col>

      <!-- 订单 -->
      <el-col :span="16" style="margin-top: 20px;">
         <div class="num">
            <el-card shadow="hover" v-for="item in countData" :key="item.name"
               :body-style="{ display: 'flex', padding: 0 }" style="margin-top: 20px;width: 32%;margin: 0 10px 10px 0;">
               <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
               <div class="valueInfo">
                  <p class="numInfo">￥{{ item.value }}</p>
                  <p class="sumInfo">{{ item.name }}</p>
               </div>
            </el-card>

         </div>

         <!-- 折线图 -->
         <el-card shadow="hover" style="height: 280px;">
            <!-- 折线图 -->
            <div ref="echarts1"></div>
         </el-card>
         <div class="cardBom" style="margin-top: 20px;">
            <el-card shadow="hover" style="height: 260px;width: 48%;">

            </el-card>
            <el-card shadow="hover" style="height: 260px;width: 48%;">

            </el-card>
         </div>
      </el-col>

   </el-row>

</template>

<script>
import { getData } from '../../api'
// import * as echarts from 'echarts'
export default {
   name: 'Home',
   data() {
      return {
         userImg: require('../../assets/logo.png'),
         tableData: [],
         countData: [
            {
               name: "今日支付订单",
               value: 1234,
               icon: "success",
               color: "#2ec7c9",
            },
            {
               name: "今日收藏订单",
               value: 210,
               icon: "star-on",
               color: "#ffb980",
            },
            {
               name: "今日未支付订单",
               value: 1234,
               icon: "s-goods",
               color: "#5ab1ef",
            },
            {
               name: "本月支付订单",
               value: 1234,
               icon: "success",
               color: "#2ec7c9",
            },
            {
               name: "本月收藏订单",
               value: 210,
               icon: "star-on",
               color: "#ffb980",
            },
            {
               name: "本月未支付订单",
               value: 1234,
               icon: "s-goods",
               color: "#5ab1ef",
            },
         ],

      };
   },
   mounted() {
      getData().then(({ data }) => {
         // console.log(data);
         const { tableData } = data.data
         this.tableData = tableData

         // //初始化echarts
         // const echarts1 = echarts.init(this.$refs.echarts1)
         // var zhexian = {}


         // const { orderData } = data.data
         // //obj转换 //x抽数据
         // const xAxis = Object.keys(orderData.data[0])
         // console.log(xAxis);
         // zhexian.xAxis = xAxis
         // zhexian.lengend = {
         //    data:xAxis
         // }
      })



   },

}
</script>

<style lang="less">
.icon {
   width: 80px;
   height: 117px;
   text-align: center;
   font-size: 30px;
   line-height: 117px;
   color: #fff;
}

.num {
   display: flex;
   flex-wrap: wrap;

   .valueInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;

      .numInfo {
         font-size: 30px;
         margin-bottom: 10px;
         line-height: 30px;
         height: 30px;
      }

      .sumInfo {
         font-size: 14px;
         color: #999;
         text-align: center;
      }

   }
}

.cardBom {
   display: flex;
   justify-content: space-between;
}
</style>