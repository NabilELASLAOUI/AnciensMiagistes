const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'USERLOGIN',
            passwordField: 'USERPWD'
        },
        function(username, password, done) {
            var crypto = require('crypto')
                , shasum = crypto.createHash('sha1');
            shasum.update(password);
            User.login(username,shasum.digest('hex'), function (user) {
                if(user === null){
                    console.log('no user')
                    return done(null, false, {message: 'No user found'});
                }else {
                    return done(null, user);
                }
            })
        }
    ));

    passport.serializeUser(function(user, done) {
        console.log(user
        )
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}
