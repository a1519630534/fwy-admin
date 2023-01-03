const db = require('../db')

const one = function (str, mes) {
    return { status: str, message: mes }
}


exports.getUserInfo = (req, res) => {

    const pag = req.query
    // pag.page
    // pag.limit
    const sqlInfo = 'select * from info order by id desc'
    db.query(sqlInfo, (err, resluts) => {

        const pageList = resluts.filter((item, index) => index < pag.limit * pag.page && index >= pag.limit * (pag.page - 1))
        // console.log(pageList);
        if (err) return res.send(one(1, err.message))

        const length = resluts.length
        if (resluts.length != 0) {
            let count = resluts.length
            // return res.send(one(0,{pageList,pag}))
            return res.send({ status: 0, pageList, pag, count, length })
        }

        return res.send(one(1, '意外的失败'))
    })

    // res.send('userinfo ok')

}

exports.addUserInfo = (req, res) => {
    const userinfo = req.body
    const bookName = req.body.book
    // console.log(userinfo);
    
    // console.log(req.body);
    //查询是否为空
    if (!userinfo.name || !userinfo.phone) {
        return res.send({
            status: 1,
            nessage: '不能为空'
        })
    }

    const numsql = `select num from book where name=?`
    db.query(numsql, bookName, (err, result) => {
        let bookNum = result[0].num
        console.log(bookNum);
        bookNum--
        console.log(bookNum);
        if(err) return res.send({status:1,message:err.message})


        if (bookNum < 1) {
            
            const sqlUpd = 'update book set isT=1 where name=?'
            db.query(sqlUpd,  req.body.name, (err, results) => {
                if (err) return res.send(one(1, err.message))
                if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))


                res.send(one(0, `归还成功`))
            })

            return res.send({ status: 1, message: '对不起，此书已被借完' })
        }

        const sqladd = `INSERT INTO info set ?`
        db.query(sqladd, userinfo, (err, result) => {
            // console.log(result);
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (result.affectedRows !== 1) return res.send({ status: 1, message: '添加失败' })

            const sqlUpd = 'update book set num=? where name=?'

            db.query(sqlUpd, [bookNum, req.body.book], (err, results) => {
                if (err) return res.send(one(1, err.message))
                if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))


                res.send({ status: 0, message: '添加成功' })
            })

            
    
        })

    })
    //添加




}


exports.delUserInfo = (req, res) => {
    const sqlDel = 'DELETE FROM info WHERE id=?'

    const { id } = req.body
    db.query(sqlDel, id, (err, results) => {
        // console.log(results);
        if (err) return res.send(one(1, err.message))
        if (results.affectedRows !== 1) return res.send(one(1, '删除失败，用户名可能不存在'))

        res.send(one(0, '删除成功'))


    }

    )

}


exports.updUserInfo = (req, res) => {


    const sqlInfo = 'select * from info where id=?'
    db.query(sqlInfo, req.body.id, (err, resluts) => {
        if (err) return res.send(one(1, err.message))

        if (resluts.length === 0) {
            return res.send(one(0, '修改失败，不存在此用户'))
        }


        //修改
        const sqlUpd = 'update info set ? where id=?'
        const userinfo = req.body


        db.query(sqlUpd, [userinfo, req.body.id], (err, results) => {
            if (err) return res.send(one(1, err.message))
            if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))


            res.send(one(0, `修改成功，${results.affectedRows}条数据被修改`))
        })

    })

}


exports.serUserInfo = (req, res) => {
    let serName = req.query.name
    const sqlInfo = 'select * from info where name=? '
    db.query(sqlInfo, serName, (err, resluts) => {

        if (err) return res.send(one(1, err.message))

        if (resluts.length != 0) {
            let count = resluts.length
            return res.send(one(20000, resluts))
        }

        return res.send(one(1, '意外的失败'))
    })

    // res.send('userinfo ok')

}