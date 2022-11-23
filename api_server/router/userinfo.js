const express = require('express')
const router = express.Router()
const { getUserInfo,updateUserInfo,deleteUserInfo } = require('../router_handler/userinfo')

router.get('/userinfo',getUserInfo)
router.post('/userinfo/upd',updateUserInfo)
router.post('/userinfo/del',deleteUserInfo)



module.exports = router