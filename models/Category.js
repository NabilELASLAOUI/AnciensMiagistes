
let connection = require('../config/db')
let moment = require('../config/moment')


class Category {

    constructor(row) {
        this.row = row
    }

    get CATEGORYNAME() {
        return this.row.CATEGORYNAME
    }
    get CATEGORYID(){
        return this.row.CATEGORYID
    }
    static create(categoryName, cb) {
        connection.query('INSERT INTO category SET CATEGORYNAME=?', [categoryName], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM Category', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Category(row)))
        //console.log(rows)
        })
    }
    static catMenu(cb) {
        connection.query("SELECT * FROM Category WHERE CATEGORYNAME !='Actualités'", (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Category(row)))
        //console.log(rows)
    })
    }
    static catActu(cb) {
        connection.query("SELECT * FROM Category WHERE CATEGORYNAME ='Actualités'", (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Category(row)))
    })
    }
    static getOne(categoryid, cb) {
        connection.query('SELECT * FROM Category WHERE CATEGORYID = ?', [categoryid], (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Category(row)))
        })
    }


    static update(categoryName,categoryid , cb){
        connection.query('UPDATE Category SET CATEGORYNAME = ? WHERE CATEGORYID = ?', [categoryName,categoryid], (err, result) => {
            if(err) throw err
            cb(result);
        })
    }

    static delete_(categoryid, cb){
        connection.query('DELETE FROM category WHERE CATEGORYID = ?', [categoryid], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }

}

module.exports = Category