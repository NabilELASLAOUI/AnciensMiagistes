

let express = require('express');
let router = express.Router();
let config = require('../config/db');
let User = require('../models/User')
let Role = require('../models/Role')
let passport = require('passport');
const bcrypt = require('bcrypt');



// Register Form
router.get('/register', function(req, res){
    Role.all(function (roles) {
        res.render('users/register',{roles:roles})
    })
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/roles',
        failureRedirect:'/',
        failureFlash: 'adresse email ou mot de passe incorrect'
    })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Vous êtes déconnectés');
    res.redirect('/roles');
});

// Register Proccess
router.post('/register', function(req, res){
    const USERNAME = req.body.USERNAME;
    const USERSURNAME = req.body.USERSURNAME;
    const USERPHONE = req.body.USERPHONE;
    const USERADDRESS = req.body.USERADDRESS;
    const USERLOGIN = req.body.USERLOGIN;
    const USERPWD = req.body.USERPWD;
    const USERPWD2 = req.body.USERPWD2;
    const ROLEID = 1; // to do

    req.checkBody('USERNAME', 'Saisissez votre nom').notEmpty();
    req.checkBody('USERSURNAME', 'Saisissez votre Prénom').notEmpty();
    req.checkBody('USERPHONE', 'Saisissez votre numéro téléphone').notEmpty();
    req.checkBody('USERADDRESS', 'Saisissez votre Adress').notEmpty();
    req.checkBody('USERLOGIN', 'Saisissez votre Adress mail').isEmail();
    req.checkBody('USERPWD', 'Saisissez votre mot de passe').notEmpty();
    req.checkBody('USERPWD2', 'mot de passe n est pas correct').equals(req.body.USERPWD);

    let errors = req.validationErrors();

    if(errors){
        res.render('users/register', {
            errors:errors
        });
    } else {
        bcrypt.genSalt(10,function (err, salt) {
            bcrypt.hash(USERPWD,salt,function (err, hash) {
                User.create(USERNAME,USERSURNAME,USERPHONE,USERADDRESS,USERLOGIN, hash,ROLEID, function () {
                    req.flash('success',"user bien ajouté !")
                    res.redirect('/')
                })
            })
        });
    }
});

module.exports = router;