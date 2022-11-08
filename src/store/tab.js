import Cookie from "js-cookie"
export default {

    state: {
        isCollapse: false,
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        menu: [],
        rolo:[]
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state, val) {


            if (state.tabList.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabList.push(val)
                }

            }
        },
        //点击tab关闭按钮
        closeTab(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)


        },
        setMenu(state, val) {
            state.menu = val

            //设置缓存

            Cookie.set('menu', JSON.stringify(val))

        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            // console.log(menu);
            // state.menu = menu
            // const menuArr = []
            // //组装动态路由,给每一个路由添加component属性
            // menu.forEach(item => {
            //     console.log(item,'item');
            //     if (item.children) {
            //         item.children = item.children.map(item => {
            //             item.component = () => import(`../views/${item.name}/index`)
            //             return item
            //         })
            //         menuArr.push(...item.children)
            //     }else
            //     item.component = () => import(`../views/${item.name}/index`)
                
            //     menuArr.push(item)
            // });
            // console.log(menuArr,'menuArr');
            
            // //动态添加路由
            // menuArr.forEach(item => {
            //     router.addRoute('Main',item) 
            //     // router.addRoute({ path: item.path, component: item.name })
            // })
        }
    }
}