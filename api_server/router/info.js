const express = require('express')
const { getUserInfo ,addUserInfo,delUserInfo,updUserInfo} = require('../router_handler/info')

const router = express.Router()

//获取
router.get('/getlist',getUserInfo)
router.post('/addlist',addUserInfo)
router.post('/updlist',delUserInfo)
router.post('/dellist',updUserInfo)

//添加


//删除

//修改


module.exports = router
