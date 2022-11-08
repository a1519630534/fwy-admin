<template>
    <div>
        <el-container>
            
            <Nav></Nav>
            <el-container>
                <el-header>
                    <comm-header></comm-header>
                    
                </el-header>
                <!-- tab -->
                <com-tag></com-tag>
                <el-main>
                    <!-- 路由出口 -->
                    <!-- 路由渲染在这里 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import CommHeader from '@/components/commHeader.vue';
import Nav from "../components/CommonAside/nav.vue";
import ComTag from '@/components/ComTag.vue';

export default {
    name: "Main",
    data() {
        return {};
    },
    mounted() {
    },
    methods: {},
    components: { Nav, CommHeader, ComTag }
};
</script>

<style lang="less" scoped>
.el-container{
    .el-header{
        
        background-color: #666;
    }
}
</style>