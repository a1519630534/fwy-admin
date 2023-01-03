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
            // state.menu = val

            //设置缓存

            Cookie.set('menu', JSON.stringify(val))

        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            state.menu = JSON.parse(Cookie.get('menu'))

        }
    }
}