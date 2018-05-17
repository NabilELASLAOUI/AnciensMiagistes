
let connection = require('../config/db')
let moment = require('../config/moment')


class Company {

    constructor(row) {
        this.row = row
    }

    get COMPANYNAME() {
        return this.row.COMPANYNAME
    }
	get COMPANYDESC() {
        return this.row.COMPANYDESC
    }
	
    get USERID(){
        return this.row.USERID
    }
    static create(userid, companyName, companyDesc, cb) {
        connection.query('INSERT INTO company SET USERID = ?, COMPANYNAME = ?, COMPANYDESC = ?', [userid, companyName, companyDesc], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM company', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Company(row)))
        })
    }

    static getOne(userid, cb) {
        connection.query('SELECT * FROM company WHERE USERID = ?', [userid], (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Company(row)))
        })
    }


    static update(companyName, companyDesc, userid, cb){
        connection.query('UPDATE company SET COMPANYNAME= ?, COMPANYDESC = ? WHERE USERID = ?', [companyName, companyDesc, userid], (err, result) => {
            if(err) throw err
            cb(result);
        })
    }

    static delete_(userid, cb){
        connection.query('DELETE FROM company WHERE USERID = ?', [userid], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }


}

module.exports = Company