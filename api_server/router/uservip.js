const express = require('express')
const {regUser , login} = require('../router_handler/uservip')
const router = express.Router()




router.post('/vipregist',regUser)

router.post('/viplogin',login)




module.exports = router