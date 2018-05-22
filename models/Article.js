
let connection = require('../config/db')
let moment = require('../config/moment')


class  Article {

    constructor(row){
        this._row = row;
    }
    get ARTICLEID(){
        return this._row.ARTICLEID
    }
    get USERID(){
        return this._row.USERID
    }
    get ARTICLENAME(){
        return this._row.ARTICLENAME
    }

    get ARTICLEDESC(){
        return this._row.ARTICLEDESC
    }
    get CATEGORYID(){
        return this._row.CATEGORYID
    }
    get ARTICLEDOC(){
        return this._row.ARTICLEDOC
    }
    static create(userid,categoryid,articlename,articledate,articledesc,articledoc,cb){

        connection.query('INSERT INTO article SET USERID=?, CATEGORYID=?, ARTICLENAME=?, ARTICLEDATE=? ,ARTICLEDESC=?,ARTICLEDOC=?',[userid,categoryid,articlename,articledate,articledesc,articledoc],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }
    static update(articleid,userid,categoryid,articlename,articledesc,articledoc,cb){

        connection.query('UPDATE article SET USERID=?, CATEGORYID=?, ARTICLENAME=?,ARTICLEDESC=?,ARTICLEDOC=? WHERE ARTICLEID=?',[userid,categoryid,articlename,articledesc,articledoc,articleid],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }

    static all(cb){
        connection.query('SELECT * FROM article',(err,rows)=>{
            if (err) throw err
           cb(rows.map((row) => new Article(row)))

    })
    }
    static getOne(id,cb){
        connection.query('SELECT * FROM article WHERE ARTICLEID='+id,(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Article(row)))

        })
    }
    static delete(id,cb){
        connection.query('DELETE FROM article WHERE ARTICLEID='+id,(err,result)=>{
            if (err) throw err
            cb(result)

        })
    }

}

module.exports = Article