
let connection = require('../config/db')
let moment = require('../config/moment')


class  User {

    constructor(row){
        this._row = row;
    }
    get USERID(){
        return this._row.USERID
    }
    get USERLOGIN(){
        return this._row.USERLOGIN
    }
    get USERNAME(){
        return this._row.USERNAME
    }
    get USERSURNAME(){
        return this._row.USERSURNAME
    }
    get USERPHONE(){
        return this._row.USERPHONE
    }
    get USERSTATUS(){
        return this._row.USERSTATUS
    }
    get ROLEID(){
        return this._row.ROLEID
    }



    static create(username,usersurname,userphone,useradress,userlogin,userpwd,role,cb){

        connection.query('INSERT INTO user SET USERNAME=?, USERSURNAME=?,USERPHONE=?, USERADDRESS=?,USERLOGIN=?, USERPWD=?,ROLEID=?', [username, usersurname, userphone, useradress, userlogin, userpwd, role], (err, result) => {
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

    static update(roleName,id , cb){
        connection.query('UPDATE role SET ROLENAME= ? WHERE ROLEID = ?', [roleName,id], (err, result) => {
            if(err) throw err
            cb(result);
    })
    }

    static delete(id, cb){
        connection.query('DELETE FROM user WHERE USERID = ? ', [id], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }

    static getOne(id, cb) {
        connection.query('SELECT * FROM role WHERE USERID = ?',[id], (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Role(row)))
    })
    }

}

module.exports = User