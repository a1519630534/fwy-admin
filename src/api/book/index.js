import axios from '../axios'

export default {
    getlist(params){
        return axios.get('/getlist',params)
    },
    
    serlist(params){
        return axios.get('/serlist',params)
    },
    add(data){
        return axios.post('/addlist',data)
    },
    del(data){
        return axios.post('/dellist',data)
    },
    upd(data){
        return axios.post('/updlist',data)
    },
}