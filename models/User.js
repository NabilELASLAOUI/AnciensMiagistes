
let connection = require('../config/db')
let moment = require('../config/moment')


class  User {

    constructor(row){
        this._row = row;
    }

    get USERID() {
        return this._row.USERID
    }

    get USERLOGIN() {
        return this._row.USERLOGIN
    }

    get USERNAME() {
        return this._row.USERNAME
    }

    get USERSURNAME() {
        return this._row.USERSURNAME
    }

    get USERPHONE() {
        return this._row.USERPHONE
    }

    get USERADDRESS() {
        return this._row.USERADDRESS
    }

    get USERSTATUS() {
        return this._row.USERSTATUS
    }

    get ROLEID() {
        return this._row.ROLEID
    }

    get ROLENAME() {
        return this._row.ROLENAME
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
    static findByLogin(log,cb){
        connection.query("SELECT * FROM user WHERE USERLOGIN='"+log+"'",(err,rows)=>{
            if (err) throw err
            cb(rows.map((row) => new User(row)))
    })
    }

    static update(username, usersurname, userphone, useraddress, userlogin, roleid, userid, cb) {
        connection.query('UPDATE user SET USERNAME= ?, USERSURNAME= ?,USERPHONE= ?,USERADDRESS=?, USERLOGIN=?, ROLEID=? WHERE USERID = ?', [username, usersurname, userphone, useraddress, userlogin, roleid, userid], (err, result) => {
            if(err) throw err
            cb(result);
    })
    }

    static update_pwd(userpwd, userid, cb) {
        connection.query('UPDATE user SET  USERPWD=? WHERE USERID = ?', [userpwd, userid], (err, result) => {
            if(err) throw err
            cb(result);
    })
    }
    static Valide(id, cb) {
        connection.query('UPDATE user SET USERSTATUS=1 WHERE USERID = ?', [id], (err, result) => {
            if(err) throw err
            cb(result);
    })
    }

    static delete(id, cb) {
        connection.query('DELETE FROM user WHERE USERID = ? ', [id], (err, result) => {
            if(err) throw err
            cb(result)
        }
    )
    }

    static getOne(id, cb) {
        connection.query('SELECT * FROM user WHERE USERID = ? LIMIT 1', [id], (err, rows) => {
            if(err) throw err
            cb(rows.map((row) => new User(row)
    ))
    })
    }

    static Allu(cb) {
        connection.query('SELECT role.ROLENAME,user.USERID,user.USERNAME,user.USERSURNAME,user.USERPHONE,user.USERLOGIN,user.USERSTATUS FROM user,role WHERE user.ROLEID=role.ROLEID ', (err, rows) => {
            if(err) throw err
            cb(rows.map((row) => new User(row)
    ))
    })
    }

}

module.exports = User