const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('../config/db');


module.exports = function(passport){

    // Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
        console.log('okkkk')
        // Match Username
        User.login(username,password, function (user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'No user found'});
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
