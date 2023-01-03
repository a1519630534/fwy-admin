

const state = {

    userinfo:{}
}

const mutations = {

    SET_USER_INFO(state,val){
        state.userinfo = val
        // console.log(this.state.userinfo);
    }
}

const actions = {

    getInfo({commit},data){
        commit('SET_USER_INFO',data)
    },

    getBook({commit},data){
        console.log(1);
    }
}

export default {
    state,
    mutations,
    actions
}