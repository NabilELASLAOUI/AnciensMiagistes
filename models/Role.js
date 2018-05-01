
let connection = require('../config/db')
let moment = require('../config/moment')


class  Role {

    constructor(row){
        this.row = row
    }

    get ROLENAME(){
        return this.row.ROLENAME
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
}

module.exports = Role