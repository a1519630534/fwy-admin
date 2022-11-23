const express = require('express')
const {regUser , login} = require('../router_handler/user')
const router = express.Router()




router.post('/regist',regUser)

router.post('/login',login)




module.exports = router