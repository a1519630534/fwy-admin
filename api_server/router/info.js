const express = require('express')
const { getUserInfo ,addUserInfo,delUserInfo,updUserInfo, serUserInfo} = require('../router_handler/info')

const router = express.Router()

//获取
router.get('/getlist',getUserInfo)
router.get('/serlist',serUserInfo)
router.post('/addlist',addUserInfo)
router.post('/dellist',delUserInfo)
router.post('/updlist',updUserInfo)

//添加


//删除

//修改


module.exports = router
