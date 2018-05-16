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
            db.query('SELECT USERPWD FROM user WHERE USERLOGIN=?',[username],(err,results,fields)=>{
                if (err){done(err)}
                if (results.length === 0){
                    done(null,false);
                }else {
                    const hash = results[0].USERPWD.toString();
                    bcrypt.compare(password, hash, function(err, response){
                        console.log(response)
                        if (response === true){
                            return done(null,{user_id:43});
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
