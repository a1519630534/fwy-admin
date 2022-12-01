const db = require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userInfo = req.body
    //查询是否为空
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            nessage: '用户名或者密码错误'
        })
    }
    console.log(userInfo);

    //判断是否存在相同用户名
    const sqlStr = `SELECT * FROM vip WHERE username=?`


    db.query(sqlStr, userInfo.username, (err, result) => {

        if (err) {
            return res.send({ status: 1, message: err.message })
        }

        // console.log(result);
        if (result.length > 0) {
            return res.send({ status: 1, message: '用户名已存在' })
        }


        userInfo.password = bcryptjs.hashSync(userInfo.password, 10)
        //插入新用户
        const sqladd = `INSERT INTO vip set ?`
        db.query(sqladd, userInfo, (err, result) => {
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (result.affectedRows !== 1) return res.send({ status: 1, message: '注册失败' })
            res.send({ status: 20000, message: '注册成功' })

        })


    })


}

//登录
exports.login = (req, res) => {
    console.log(req.body);
    const userinfo = req.body
    const sqllogin = 'SELECT * FROM vip WHERE username=?'
    db.query(sqllogin, userinfo.username, (err, result) => {

        if (err) return res.send({ status: 1, message: err.message })
        if (result.length !== 1) return res.send({ status: 1, message: '登录失败' })

        //效验密码
        const comres = bcryptjs.compareSync(userinfo.password, result[0].password)



        if (!comres) return res.send({ status: 1, message: '登录失败' })



        //生成token
        const user = { ...result[0], password: '', phone: '' }
        const tokenStr = jwt.sign(user, config.jwtSerKey, { expiresIn: config.expiresIn })


        


    })

}