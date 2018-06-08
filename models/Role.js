
let connection = require('../config/db')
let moment = require('../config/moment')

class  Role {

    constructor(row){
        this.row = row
    }

    // getters
    get ROLENAME(){
        return this.row.ROLENAME
    }
    get ROLEID(){
        return this.row.ROLEID
    }
    // permet de récupérer la liste des roles en les stockant dans le callback cb
    static all(cb){
        connection.query('SELECT * FROM role',(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new Role(row)))
        })
    }

    static create(roleName,cb){
        connection.query('INSERT INTO role SET ROLENAME=?',[roleName],(err,result)=>{
            if (err) throw err
            cb(result)
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