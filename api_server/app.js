const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')
const config = require('./config')
const bodyParser = require('body-parser')


const app = express()
//配置cors
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(expressJwt({secret: config.jwtSerKey}).unless({path:[/^\/api/]}))

//用户登录注册模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

const vipRouter = require('./router/uservip')
app.use('/api',vipRouter)

//列表
const infoRouter = require('./router/info')
app.use('/api',infoRouter)

//用户信息模块
const userinfoRouter = require('./router/userinfo')
app.use('/api',userinfoRouter)

const vipuserinfoRouter = require('./router/vipuserinfo')
app.use('/api',vipuserinfoRouter)




// app.use((err,req,res,next)=>{
//     if(err.name==='UnauthorizedError') return res.send({status:1,message:'身份认证失败'})
// })

app.listen(3007,()=>{
    console.log('运行成功，端口3007');
})