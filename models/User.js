
let connection = require('../config/db')
let moment = require('../config/moment')


class  User {

    constructor(row){
        this.row = row
    }
    get USERLOGIN(){
        return this.row.USERLOGIN
    }

    static create(User,cb){

        connection.query('INSERT INTO user SET content=?, created_at=?',[content,new Date()],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }

    static all(cb){
        connection.query('SELECT * FROM messages',(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new User(row)))
        })
    }
    static login(log,mdp,cb){
        connection.query('SELECT * FROM user WHERE USERLOGIN=? and USERPWD=?',[log,mdp],(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new User(row)))
        })
    }
}

module.exports = User