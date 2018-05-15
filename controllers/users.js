

let express = require('express');
let router = express.Router();
let config = require('../config/db');
let User = require('../models/User')
let passport = require('passport');



// Register Form
router.get('/register', function(req, res){
    res.render('users/register');
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'roles/roles',
        failureRedirect:'/',
        failureFlash: true
    })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

// Register Proccess
router.post('/register', function(req, res){
    const USERNAME = req.body.USERNAME;
    const USERSURNAME = req.body.USERSURNAME;
    const USERADDRESS = req.body.USERADDRESS;
    const USERPWD = req.body.USERPWD;
    const USERPWD2 = req.body.USERPWD2;
    const ROLEID = 5; // to do

    req.checkBody('USERNAME', 'Saisissez votre nom').notEmpty();
    req.checkBody('USERSURNAME', 'Saisissez votre Prénom').notEmpty();
    req.checkBody('USERADDRESS', 'Saisissez votre Adress').notEmpty();
    req.checkBody('USERPWD', 'Saisissez votre mot de passe').notEmpty();
    req.checkBody('USERPWD2', 'mot de passe n est pas correct').equals(req.body.USERPWD);

    let errors = req.validationErrors();

    if(errors){
        res.render('users/register', {
            errors:errors
        });
    } else {
        var crypto = require('crypto')
            , shasum = crypto.createHash('sha1');
        shasum.update(USERPWD);
        User.create(USERNAME,USERSURNAME,USERADDRESS,shasum.digest('hex'),ROLEID, function () {
            req.flash('success',"user bien ajouté !")
            res.redirect('/roles')
        })
    }
});

module.exports = router;