
let connection = require('../config/db')
let moment = require('../config/moment')


class  Role {

    constructor(row){
        this.row = row
    }

    get ROLENAME(){
        return this.row.ROLENAME
    }
    get ROLEID(){
        return this.row.ROLEID
    }

    static create(roleName,cb){
        connection.query('INSERT INTO role SET ROLENAME=?',[roleName],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }

    static all(cb){
        connection.query('SELECT * FROM role',(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Role(row)))
        })
    }

    static update(roleName,id , cb){
        connection.query('UPDATE role SET ROLENAME= ? WHERE ROLEID = ?', [roleName,id], (err, result) => {
            if(err) throw err
            cb(result);
        })
    }

    static delete(id, cb){
        connection.query('DELETE FROM role WHERE ROLEID = ?', [id], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }

    static getOne(id, cb) {
        connection.query('SELECT * FROM role WHERE ROLEID = ?', [id], (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Role(row)))
        })
    }
}

module.exports = Role