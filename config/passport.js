const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'USERLOGIN',
            passwordField: 'USERPWD'
        },
        function(username, password, done) {
            db.query('SELECT USERPWD FROM user WHERE USERLOGIN=?',[username],(err,results,fields)=>{
                if (err){done(err)}
                if (results.length === 0){
                    done(null,false);
                }else {
                    return done(null,'user');
                }

            })
        console.log('/////////////////////////////')
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

}
