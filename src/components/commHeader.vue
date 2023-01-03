<template>


    <header>
        <div class="l-content">
            <el-button @click="swTab" type="primary" size="mini" icon="el-icon-menu"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: item.path }" v-for="item in tags" :key="item.path">{{ item.label }}
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span>
                    <img :src="userImg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>


</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    name: 'commHeader',
    data() {
        return {
            userImg: require('../assets/logo.png'),
        };
    },
    methods: {
        swTab() {
            this.$store.commit('collapseMenu')
        },
        //点击登出按钮
        handleCommand(command){
            if(command === 'out'){
                Cookie.remove('token')
                Cookie.remove('menu')
                Cookie.remove('username')
                this.$router.push('login')

            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    mounted() {
        // console.log(this.tags);
    },

}
</script>

<style lang="less" scoped>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}

.l-content {
    display: flex;
    align-content: center;

    .el-button {
        margin-right: 20px;
    }

    /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
            font-weight: 400;
            font-size: 14px;

            &.is-link {
                color: #949e9e;
            }
        }

        &:last-child {
            .el-breadcrumb__inner {
                color: #fff;
            }

        }
    }
}

.r-content {

    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
}

.el-breadcrumb {
    font-size: 16px;
    text-align: center;
    line-height: 28px;
    color: aqua;
}
</style>