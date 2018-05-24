let express = require('express');
let router = express.Router();
let config = require('../config/db');
let User = require('../models/User')
let Role = require('../models/Role')
let passport = require('passport');
const bcrypt = require('bcrypt');


// Liste users
router.get('/',ensureAuthenticated, function(req, res){
    Role.getOne(req.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR'){
            User.Allu(function (users) {
                
                res.render('users/users',{users:users})
            })
        }else{
            res.redirect('/roles')
        }

    })

});

// Register Form
router.get('/register', function(req, res){
    Role.all(function (roles) {
        res.render('users/register',{roles:roles})
    })
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/users',
        failureRedirect:'/',
        failureFlash: 'adresse email ou mot de passe incorrect'
    })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Vous êtes déconnectés');
    res.redirect('/');

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
    const ROLEID = req.body.ROLEID;
    req.checkBody('USERNAME', 'Saisissez votre nom').notEmpty();
    req.checkBody('USERSURNAME', 'Saisissez votre Prénom').notEmpty();
    req.checkBody('USERPHONE', 'Saisissez votre numéro téléphone').notEmpty();
    req.checkBody('USERADDRESS', 'Saisissez votre Adress').notEmpty();
    req.checkBody('USERLOGIN', 'Saisissez votre Adress mail').isEmail();
    req.checkBody('USERPWD', 'Saisissez votre mot de passe').notEmpty();
    req.checkBody('USERPWD2', 'mot de passe n est pas correct').equals(req.body.USERPWD);

    let errors = req.validationErrors();

    if(errors){
        Role.all(function (roles) {
            res.render('users/register',{roles:roles,errors:errors})
        });
    } else {
        bcrypt.genSalt(10,function (err, salt) {
            bcrypt.hash(USERPWD,salt,function (err, hash) {
                User.create(USERNAME,USERSURNAME,USERPHONE,USERADDRESS,USERLOGIN, hash,ROLEID, function () {
                    req.flash('success',"user bien ajouté !")
                    res.redirect('/')
                    let MonUser = [
                        {
                            username: USERNAME,
                            usersurname: USERSURNAME,
                            email: USERLOGIN,
                        }
                    ]
                    require('../config/emailing')('welcome',MonUser);
                })
            })
        });
    }
});


router.get('/delete/:id',ensureAuthenticated,(request, response) => {
    if (request.params.id){

    User.delete(request.params.id, function(){
        request.flash('success', "User supprimé")
    })
}
response.redirect('/users')
});

router.post('/update', (req, res) => {
    const USERNAME = req.body.USERNAME;
const USERSURNAME = req.body.USERSURNAME;
const USERPHONE = req.body.USERPHONE;
const USERADDRESS = req.body.USERADDRESS;
const USERLOGIN = req.body.USERLOGIN;
const ROLEID = req.body.ROLEID;
const USERID = req.body.USERID;
req.checkBody('USERNAME', 'Saisissez votre nom').notEmpty();
req.checkBody('USERSURNAME', 'Saisissez votre Prénom').notEmpty();
req.checkBody('USERPHONE', 'Saisissez votre numéro téléphone').notEmpty();
req.checkBody('USERADDRESS', 'Saisissez votre Adress').notEmpty();
req.checkBody('USERLOGIN', 'Saisissez votre Adress mail').isEmail();
// Get Errors
let errors = req.validationErrors();

if (errors) {
    Role.all(function (roles) {
        res.render('users/edit', { roles: roles, errors: errors })
    })
} else {
    User.update(USERNAME,USERSURNAME,USERPHONE,USERADDRESS,USERLOGIN,ROLEID,USERID, function () {
        req.flash('success', "user modifiée !")
        res.redirect('/users')
    })
}
})

router.get('/edit/:id',ensureAuthenticated, (request, response) => {
    if (request.params.id) {
    User.getOne(request.params.id, function(user){
        Role.all(function (roles) {
            response.render('users/edit', { user: user,roles : roles })
        })
    })}
})

// valide une inscription
router.get('/valide/:id',ensureAuthenticated, function(req, res){
    User.Valide(req.params.id,function (users) {
        User.Allu(function (users) {
            res.render('users/users',{users:users})
        })
    })
    User.getOne(req.params.id, function(users) {
        for(user of users);
        let MonUser = [
            {
                username: user.USERNAME,
                usersurname: user.USERSURNAME,
                email: user.USERLOGIN,
            },
        ]
        require('../config/emailing')('validation', MonUser);
    })
});

// mon Profile
router.get('/monProfile/:id',ensureAuthenticated, function(req, res){
    if (req.params.id) {
        User.getOne(req.params.id, function(user){
            if (user[0].ROLEID != undefined) {
                Role.getOne(user[0].ROLEID,function (role) {
                    res.render('users/monProfile', { user: user,role : role[0].ROLENAME })
                })
            }
        })}
});


// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', "vous n'etes pas connecter");
        res.redirect('/');
    }
}

module.exports = router;