import axios from '../axios'

export default {
    getbook(params){
        return axios.get('/getbook',params)
    },
    
    serbook(params){
        return axios.get('/serbook',params)
    },
    add(data){
        return axios.post('/addbook',data)
    },
    del(data){
        return axios.post('/delbook',data)
    },
    upd(data){
        return axios.post('/updbook',data)
    },
    updNum(data){
        return axios.post('/updNum',data)
    },
}