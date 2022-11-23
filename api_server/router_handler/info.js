const db = require('../db')

const one = function(str,mes){
    return {status:str,message:mes}
}


exports.getUserInfo = (req, res) => {

    const sqlInfo = 'select * from info'
    db.query(sqlInfo,req.body.name, (err, resluts) => {
        let page = 1
        let limit = 10
        const pageList = resluts.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        console.log(pageList);
        if(err) return res.send(one(1,err.message))

        if(resluts.length != 0 ){
            return res.send(one(0,pageList))
        }

        return res.send(one(1,'意外的失败'))
    })

    // res.send('userinfo ok')

}

exports.addUserInfo = (req,res)=>{
    const {name,idcrad,ondata,backdata,book,phone,subackdata} = req.body
    //查询是否为空
    if (!name || !phone) {
        return res.send({
            status: 1,
            nessage: '不能为空'
        })
    }

        //添加
        const sqladd = `INSERT INTO info set ?`
        db.query(sqladd,{name:name,idcrad:idcrad,ondata:ondata,backdata:backdata,
            book:book,phone,subackdata:subackdata
        },(err,result)=>{
            if(err){
                return res.send({status:1,message:err.message})
            }
            if(result.affectedRows !==1) return res.send({status:1,message:'添加失败'})
            res.send({status:0,message:'添加成功'})
            
        })



}


exports.delUserInfo = (req,res) =>{
    const sqlDel = 'DELETE FROM info WHERE id=?'
    
    const {id} = req.body
    db.query(sqlDel,id,(err,results)=>{
        // console.log(results);
        if(err) return res.send(one(1,err.message))
        if(results.affectedRows !==1) return res.send(one(1,'删除失败，用户名可能不存在'))
        
        res.send(one(0,'删除成功'))
        
        
    }
        
    )

}


exports.updUserInfo = (req,res) =>{

    const sqlInfo = 'select * from info where id=?'
    db.query(sqlInfo,req.body.id, (err, resluts) => {
        if(err) return res.send(one(1,err.message))

        if(resluts.length === 0 ){
            return res.send(one(0,'修改失败，不存在此用户'))
        }


        //修改
        const sqlUpd = 'update info set ? where id=?'
        const userinfo = req.body

 
        db.query(sqlUpd,[userinfo,req.body.id],(err,results)=>{
            if(err) return res.send(one(1,err.message)) 
             if(results.affectedRows !==1) return res.send(one(1,'修改失败')) 
    
    
            res.send(one(0,`修改成功，${results.affectedRows}条数据被修改`))
        })
        
    })







}