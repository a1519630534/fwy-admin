import axios from '../axios'


export default{
    login(data){
        return axios.post('/login',data)
    },

    regist(data){
        return axios.post('/regist',data)
    },
    viplogin(data){
        return axios.post('/viplogin',data)
    },

    vipregist(data){
        return axios.post('/vipregist',data)
    },
    getUserInfo(){
        return axios.get('/userinfo')
    },
    updUserInfo(data){
        return axios.post('/userinfo/upd',data)
    },
    delUserInfo(data){
        return axios.post('/userinfo/del',data)
    },
    getVipUserInfo(){
        return axios.get('/vipuserinfo')
    },
    vipupdUserInfo(data){
        return axios.post('/vipuserinfo/upd',data)
    },
    vipdelUserInfo(data){
        return axios.post('/vipuserinfo/del',data)
    },
}

