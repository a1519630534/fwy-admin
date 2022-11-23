import axios from '../axios'


export default{
    login(data){
        return axios.post('/login',data)
    },

    regist(data){
        return axios.post('/regist',data)
    },
    viplogin(data){
        return axios.post('/login',data)
    },

    vipregist(data){
        return axios.post('/regist',data)
    },
    getUserInfo(){
        return axios.get('/userinfo')
    },
    updUserInfo(data){
        return axios.post('/userinfo/upd',data)
    },
    delUserInfo(date){
        return axios.post('/userinfo/del',date)
    },
    getVipUserInfo(){
        return axios.get('/vipuserinfo')
    },
    vipupdUserInfo(date){
        return axios.post('/vipuserinfo/upd',date)
    },
    vipdelUserInfo(date){
        return axios.post('/vipuserinfo/del',date)
    },
}

