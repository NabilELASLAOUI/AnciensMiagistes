const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'USERLOGIN',
            passwordField: 'USERPWD'
        },
        function(username, password, done) {
            db.query('SELECT * FROM user WHERE USERLOGIN=?',[username],(err,results,fields)=>{
                if (err){done(err);}
                if (results.length === 0){
                done(null,false);
            }else {
                const hash = results[0].USERPWD.toString();
                bcrypt.compare(password, hash, function(err, response){
                    if (response === true){
                        if(results[0].USERSTATUS === 1){
                            return done(null,{user:results[0]});
                        }else {
                            return done(null,false);
                        }
                    }else {
                        return done(null,false);
                    }
                });
            }
        })
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}