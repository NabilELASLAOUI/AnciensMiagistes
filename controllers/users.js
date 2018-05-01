

const express = require('express');
const router = express.Router();

let User = require('../models/User')



// Register Form
router.get('/register', function(req, res){
    res.render('users/register');
});

router.post('/login', (request,response)=>{
    if (request.body.USERLOGIN === undefined || request.body.USERPWD === ''){
        request.flash('error',"vous n'avez pas posté de login")
        response.redirect('/')
    }else{
        var crypto = require('crypto')
            , shasum = crypto.createHash('sha1');
        shasum.update(request.body.USERPWD);
        User.login(request.body.USERLOGIN,shasum.digest('hex'), function (user) {
            if (user){
                response.redirect('/roles')
            }else{
                response.redirect('/')
            }
        })
    }
})

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