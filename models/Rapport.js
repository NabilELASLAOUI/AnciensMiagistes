
let connection = require('../config/db')
let moment = require('../config/moment')


class  Rapport {

    constructor(row){
        this._row = row;
    }
    get RAPPORTID(){
        return this._row.RAPPORTID
    }
    get USERID(){
        return this._row.USERID
    }
    get USEREMAIL(){
        return this._row.USEREMAIL
    }
    get RAPPORTNAME(){
        return this._row.RAPPORTNAME
    }
    get RAPPORTDATE(){
        return this._row.RAPPORTDATE
    }
    get RAPPORTDESC(){
        return this._row.RAPPORTDESC
    }
    get RAPPORTDOC(){
        return this._row.RAPPORTDOC
    }
    static create(userid,useremail,rapportname,rapportdate,rapportdesc,rapportdoc,cb){

        connection.query('INSERT INTO rapport SET USERID=?, USEREMAIL=?, RAPPORTNAME=?, RAPPORTDATE=? ,RAPPORTDESC=?,RAPPORTDOC=?',[userid,useremail,rapportname,rapportdate,rapportdesc,rapportdoc],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }
    static update(rapportid,userid,useremail,rapportname,rapportdate,rapportdesc,rapportdoc,cb){
        connection.query('UPDATE rapport SET USERID=?, USEREMAIL=?, RAPPORTNAME=?, RAPPORTDATE=? ,RAPPORTDESC=?,RAPPORTDOC=? WHERE RAPPORTID=?',[userid,useremail,rapportname,rapportdate,rapportdesc,rapportdoc,rapportid],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }

    static all(cb){
        connection.query('SELECT * FROM rapport',(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Rapport(row)))

    })
    }
    static getOne(id,cb){
        connection.query('SELECT * FROM rapport WHERE RAPPORTID='+id,(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Rapport(row)))

    })
    }
    static getOneByUser(id,cb){
        connection.query('SELECT * FROM rapport WHERE USERID='+id,(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Rapport(row)))

    })
    }
    static delete(id,cb){
        connection.query('DELETE FROM rapport WHERE RAPPORTID='+id,(err,result)=>{
            if (err) throw err
            cb(result)

        })
    }

}

module.exports = Rapport