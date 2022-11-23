const db = require('../db')
const bcryptjs = require ('bcryptjs')




//封装返回函数
const one = function(str,mes){
    return {status:str,message:mes}
}

exports.getUserInfo = (req, res) => {

    const sqlSearchuser = 'select id,username,password,phone from vip'
    db.query(sqlSearchuser, (err, resluts) => {
        if(err) return res.send(one(1,err.message))

        if(resluts.length != 0 ){
            return res.send(one(0,resluts))
        }
    })

    // res.send('userinfo ok')

}

exports.deleteUserInfo = (req,res)=>{
    const sqlDel = 'DELETE FROM vip WHERE username=?'
    if(req.body.username === 'admin') return res.send(one(1,'最高管理员用户不可删除'))
    
    const delName = req.body.username
    db.query(sqlDel,delName,(err,results)=>{
        // console.log(results);
        if(err) return res.send(one(1,err.message))
        if(results.affectedRows !==1) return res.send(one(1,'删除失败，用户名可能不存在'))
        
        res.send(one(0,'删除成功'))
        
        
    }
        
    )
    // res.send('de ok')
}
let oldPassword = 0

exports.updateUserInfo = (req,res)=>{
    const sqlUpd = 'update vip set ? where username=?'
    const userinfo = req.body


    //将传入的密码进行加密
    userinfo.password = bcryptjs.hashSync(userinfo.password,10)
    
    db.query(sqlUpd,[userinfo,req.body.username],(err,results)=>{
        if(err) return res.send(one(1,err.message)) 

        if(userinfo.username === 'admin') return res.send(one(1,'最高管理员用户不可修改'))
         if(results.affectedRows !==1) return res.send(one(1,'删除失败，用户名可能不存在')) 


        res.send(one(0,'修改成功'))
    })

}