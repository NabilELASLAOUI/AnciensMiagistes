
let connection = require('../config/db')
let moment = require('../config/moment')


class  Alumni {

    constructor(row){
        this.row = row
    }

    get USERID(){
        return this.row.USERID
    }
    get USERGRADYEAR(){
        return this.row.USERGRADYEAR
    }
    get USERCOMPANY(){
        return this.row.USERCOMPANY
    }
    get USERFUNCTION(){
        return this.row.USERFUNCTION
    }
    get USERSALARY(){
        return this.row.USERSALARY
    }
    get USERFIRSTHIRINGYEAR(){
        return this.row.USERFIRSTHIRINGYEAR
    }
    get USERHIRINGYEAR(){
        return this.row.USERHIRINGYEAR
    }

    static create(userid,usergradyear,usercompany,userfunction,usersalary,userfirsthiringyear,userhiringyear,cb){

        connection.query('INSERT INTO alumni SET USERID=?, USERGRADYEAR=?, USERCOMPANY=?, USERFUNCTION=? ,USERSALARY=?,USERFIRSTHIRINGYEAR=?, USERHIRINGYEAR=?',[userid,usergradyear,usercompany,userfunction,usersalary,userfirsthiringyear,userhiringyear],(err,result)=>{
            if (err) throw err
            cb(result)
        })
    }
    static getOne(idUser, cb) {
        connection.query('SELECT * FROM alumni WHERE USERID = ?', [idUser], (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Alumni(row)))
        })
    }
    static update(usergradyear,usercompany,userfunction,usersalary,userfirsthiringyear,userhiringyear, userid, cb) {
        connection.query('UPDATE alumni SET USERGRADYEAR=?, USERCOMPANY=?, USERFUNCTION=? ,USERSALARY=?,USERFIRSTHIRINGYEAR=?, USERHIRINGYEAR=? WHERE USERID = ?', [usergradyear,usercompany,userfunction,usersalary,userfirsthiringyear,userhiringyear, userid], (err, result) => {
            if(err) throw err
            cb(result);
    })
    }
}

module.exports = Alumni