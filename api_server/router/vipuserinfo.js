const express = require('express')
const router = express.Router()
const { getUserInfo,updateUserInfo,deleteUserInfo } = require('../router_handler/vipuserinfo')

router.get('/vipuserinfo',getUserInfo)
router.post('/vipuserinfo/upd',updateUserInfo)
router.post('/vipuserinfo/del',deleteUserInfo)



module.exports = router