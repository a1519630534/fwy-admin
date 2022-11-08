<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" router >

    <h4>{{ isCollapse ? '后台' : '后台管理系统' }}</h4>
    <el-menu-item :route="item.path" :index="item.name" v-for="(item, index) in noChildrens" :key="item.name" @click="swMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="1" v-for="(item, index) in hasChildrens" :key="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="(childrenItem, index) in item.children" :key="childrenItem.path">
        <el-menu-item :router="childrenItem.path" :index="childrenItem.path">{{ childrenItem.label }}</el-menu-item>
      </el-menu-item-group>

    </el-submenu>

  </el-menu>

</template>

<script>
import Cookie from "js-cookie"

export default {
  name: "Nav",

  data() {
    return {

    };
  },

  mounted() { 
    // console.log(this.tags);

  },

  methods: {

    swMenu(item){
      // console.log(item);
      this.$store.commit('selectMenu',item)
    }

  },
  computed: {
    //没有子菜单
    noChildrens() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildrens() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menuData(){
      //如果缓存存在和不存在
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }

  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border-right: solid 0px #e6e6e6;


  h4 {
    margin: 0;
    font-size: 16px;
    line-height: 48px;
    font-weight: 400;
    color: skyblue;
    text-align: center;
  }
}
</style>