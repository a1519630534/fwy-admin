const express = require('express')
const { getBookInfo,addBookInfo,serBookInfo,delBookInfo,updBookInfo,updNum} = require('../router_handler/book')

const router = express.Router()

//获取

router.get('/getbook',getBookInfo)
router.post('/addbook',addBookInfo)
router.get('/serbook',serBookInfo)
router.post('/addbook',addBookInfo)
router.post('/delbook',delBookInfo)
router.post('/updbook',updBookInfo)
router.post('/updNum',updNum)


module.exports = router
