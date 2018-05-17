
let connection = require('../config/db')
let moment = require('../config/moment')


class  User {

    constructor(row){
        this._row = row;
    }
    get USERLOGIN(){
        return this._row.USERLOGIN
    }
	get USERID(){
        return this._row.USERID
    }

    static create(username,usersurname,userphone,useradress,userlogin,userpwd,role,cb){

        connection.query('INSERT INTO user SET USERNAME=?, USERSURNAME=?,USERPHONE=?, USERADDRESS=?,USERLOGIN=?, USERPWD=?,ROLEID=?',[username,username,userphone,useradress,userlogin,userpwd,role],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }
	static allUsers(cb) {
        connection.query('SELECT * FROM user', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new User(row)))
        })
    }

    static all(cb){
        connection.query('SELECT * FROM messages',(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new User(row)))
        })
    }

    static findById(id,cb){
        connection.query('SELECT * FROM user WHERE USERID=?',[id],(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new User(row)))
        })
    }

}

module.exports = User