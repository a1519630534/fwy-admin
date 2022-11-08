<template>
    <div class="tabs" >
        <el-tag v-for="(item,index) in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" 
            @click="changeTab(item)"
            @close="closeMenuTab(item,index)"
            size="small "
            >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex';
export default {
    name: 'ComTag',
    data() {
        return {
            property: 'value',
        };
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    mounted() {
        // console.log(this.tags);
    },
    methods: {
        ...mapMutations(['closeTab']),
        changeTab(item) {
            this.$router.push({name:item.name})
            // console.log(item);
        },
        closeMenuTab(item,index){
            //调用store的closeTab
            this.closeTab(item)
            const length = this.tags.length 

            //删除之后的跳转
            //如果是当前
            if(item.name !== this.$route.name) return
            //如果是最后一个，往左跳
            if(index === length){
                this.$router.push({
                    name: this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    },

}
</script>

<style lang="less" scoped>

.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;

        cursor: pointer;
    }
}
</style>