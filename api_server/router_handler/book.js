const db = require('../db')
const multer = require("multer")
const path = require("path")

const bodyParser = require('body-parser')
const fs = require('fs')
const pathLib = require('path')

let objMulter = multer({ dest: './www/upload/' })

const one = function (str, mes) {
    return { status: str, message: mes }
}


exports.getBookInfo = (req, res) => {

    const pag = req.query
    // pag.page
    // pag.limit
    const sqlInfo = 'select * from book order by id desc'
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

exports.addBookInfo = (req, res) => {
    const userinfo = req.body


    //添加
    const sqladd = `INSERT INTO book set ?`
    db.query(sqladd, userinfo, (err, result) => {
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        if (result.affectedRows !== 1) return res.send({ status: 1, message: '添加失败' })
        res.send({ status: 0, message: '添加成功' })

    })



}


exports.delBookInfo = (req, res) => {
    const sqlDel = 'DELETE FROM book WHERE id=?'

    const { id } = req.body
    db.query(sqlDel, id, (err, results) => {
        // console.log(results);
        if (err) return res.send(one(1, err.message))
        if (results.affectedRows !== 1) return res.send(one(1, '删除失败，用户名可能不存在'))

        res.send(one(0, '删除成功'))


    }

    )

}


exports.updBookInfo = (req, res) => {
    let bookNum = req.body.num
    // console.log(bookNum);
    
    const sqlInfo = 'select * from book where id=?'
    db.query(sqlInfo, req.body.id, (err, resluts) => {
        if (err) return res.send(one(1, err.message))

        if (resluts.length === 0) {
            return res.send(one(0, '修改失败，不存在此用户'))
        }


        //修改
        const sqlUpd = 'update book set ? where id=?'
        const userinfo = req.body


        db.query(sqlUpd, [userinfo, req.body.id], (err, results) => {
            if (err) return res.send(one(1, err.message))
            if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))

            if(bookNum < 1) {
                console.log(11);
                const absadasd = 'update book set isT=1 where name=?'
                    db.query(absadasd, req.body.name, (err, results) => {
                        if (err) return res.send(one(1, err.message))
                        if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))
        
        
                        return res.send(one(0, `归还成功`))
                    })
                    // return res.send(one(0, `修改成功，${results.affectedRows}条数据被修改`))
            }else {
                return res.send(one(0, `修改成功，${results.affectedRows}条数据被修改`))
            }
            

            
        })

    })

}


exports.serBookInfo = (req, res) => {
    console.log(req.query.name);
    let serName = req.query.name
    const sqlInfo = 'select * from book where name like ? '
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


exports.updNum = (req, res) => {

    console.log(req.body);
    const bookName = req.body.name
    const numsql = `select num from book where name=?`
    db.query(numsql, bookName, (err, result) => {
        let bookNum = result[0].num
        bookNum++
        console.log(bookNum);
        if (err) return res.send({ status: 1, message: err.message })


        if (bookNum < 1) {
            
            const sqlUpd = 'update book set isT=1 where name=?'
            db.query(sqlUpd, req.body.name, (err, results) => {
                if (err) return res.send(one(1, err.message))
                if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))


                res.send(one(0, `归还成功`))
            })

            return res.send({ status: 1, message: '对不起，此书已被借完' })
        }

        const sqlInfo = 'select * from book where name=?'
        db.query(sqlInfo, req.body.name, (err, resluts) => {
            if (err) return res.send(one(1, err.message))

            if (resluts.length === 0) {
                return res.send(one(0, '修改失败，不存在此书籍'))
            }


            //修改
            const sqlUpd = 'update book set num=? where name=?'
            


            db.query(sqlUpd, [bookNum, req.body.name], (err, results) => {
                if (err) return res.send(one(1, err.message))
                if (results.affectedRows !== 1) return res.send(one(1, '修改失败'))


                res.send(one(0, `归还成功`))
            })

        })

    })




}