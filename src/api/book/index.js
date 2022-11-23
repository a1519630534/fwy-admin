import axios from '../axios'

export default {
    getlist(){
        return axios.get('/getlist')
    }
}