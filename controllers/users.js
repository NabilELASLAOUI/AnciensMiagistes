let express = require('express');
let router = express.Router();
let config = require('../config/db');
let User = require('../models/User')
let Role = require('../models/Role')
let Alumni = require('../models/Alumni')
let Company = require('../models/Company')
let passport = require('passport');
let bcrypt = require('bcrypt');
let dateFormat = require('dateformat');
let generator = require('generate-password');

/**
 * Liste les différents utilisateurs avec leurs roles
 **/
router.get('/', ensureAuthenticated, function (req, res) {
    Role.getOne(req.user.user.ROLEID, function (role) {
        if (role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR') {
            User.Allu(function (users) {
                res.render('users/users', {users: users})
            })
        } else {
            res.redirect('/')
        }
    })
});

// Register Form
router.get('/register', function (req, res) {
    Role.all(function (roles) {
        res.render('users/register', {roles: roles})
    })
});

// Login Process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: 'adresse email ou mot de passe incorrect'
    })(req, res, next);
});

// logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');

});

// Register Proccess
router.post('/register', function (req, res) {
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

    if (errors) {
        Role.all(function (roles) {
            res.render('users/register', {roles: roles, errors: errors})
        });
    } else {
        User.findByLogin(USERLOGIN, function (user) {
            if (user.length > 0) {
                Role.all(function (roles) {
                    let error = 'Cette adresse email est déjà utilisée. Veuillez en choisir une autre svp!!';
                    res.render('users/register', {roles: roles, error: error})
                })
            } else {

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(USERPWD, salt, function (err, hash) {
                        User.create(USERNAME, USERSURNAME, USERPHONE, USERADDRESS, USERLOGIN, hash, ROLEID, function () {
                            req.flash('success', "Votre compte a bien été crée. Le modérateur du site doit le valider avant que vous puissiez vous connecter !")
                            res.redirect('/login')
                            let MonUser = [
                                {
                                    username: USERNAME,
                                    usersurname: USERSURNAME,
                                    email: USERLOGIN,
                                }
                            ]
                            require('../config/emailing')('welcome', MonUser);
                        })
                    })
                });

            }

        })
    }
});


router.get('/delete/:id', ensureAuthenticated, (request, response) => {
    Role.getOne(request.user.user.ROLEID, function (role) {
    if (role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR') {
        if (request.params.id) {
            User.delete(request.params.id, function () {
                request.flash('success', "User supprimé")
            })
        }
    } else {
        response.redirect('/')
    }
})
response.redirect('/users')
})
;

router.get('/deleteProfile/:idUser', ensureAuthenticated, (request, response) => {
            if (request.params.idUser) {
            User.delete(request.params.idUser, function () {
                request.logout();
                request.flash('success', "Votre profile a été supprimé");
                response.redirect('/login');
            })
        }

})
;

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
        res.render('users/edit', {roles: roles, errors: errors})
    })
} else {
    User.update(USERNAME, USERSURNAME, USERPHONE, USERADDRESS, USERLOGIN, USERID, function () {
        req.flash('success', "Vos information on été modifiées avec succès !")
        res.redirect('/');
    })
}
})

router.post('/update_pwd', (req, res) => {
    const USERPWDNEW = req.body.USERPWDNEW;
const USERID = req.body.USERID;
req.checkBody('USERPWDNEW', 'Saisissez votre nouveau mot de passe').notEmpty();
req.checkBody('USERPWDNEW2', 'mot de passe different').equals(req.body.USERPWDNEW);
let errors = req.validationErrors();

if (errors) {
    User.getOne(USERID, function (user) {
        res.render('users/edit_pwd', {user: user, errors: errors})
    })
} else {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(USERPWDNEW, salt, function (err, hash) {
            User.update_pwd(hash, USERID, function () {
                req.flash('success', "Mot de passe  modifié ave succes !")
                res.redirect('/login')
            })
        })
    });

}
})

router.post('/update_forgot_pwd', (req, res) => {
    const USERLOGIN = req.body.USERLOGIN;
    req.checkBody('USERLOGIN', 'Entrez une addresse valide').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        
    } else {
        User.findByLogin(USERLOGIN, function (users) {
            let user
            for(user of users);
            if(user){
                let password = generator.generate({
                    length: 10,
                    numbers: true
                });
                let MonUser = [
                    {
                        username: user.USERNAME,
                        usersurname: user.USERSURNAME,
                        userpwd: password,
                        email: user.USERLOGIN,
                    }
                ]
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        User.update_pwd(hash, user.USERID, function () {
                            req.flash('success', "Un mail vous a été envoyé!")
                            res.redirect('/login')
                        })
                    })
                })
                require('../config/emailing')('pwd_modification', MonUser);
            }else{
                req.flash('alert', "Entrez un email valide!")
                res.render('users/edit_forgot_pwd')
            }
        })

    }
})

router.get('/forgot-pwd', (request, response) => {
    response.render('users/edit_forgot_pwd')
})

router.get('/edit/:id', ensureAuthenticated, (request, response) => {
    if(request.params.id){
    User.getOne(request.params.id, function (user) {
        Role.all(function (roles) {
            response.render('users/edit', {user: user, roles: roles})
        })
    })
}
})
router.get('/edit_pwd/:id', ensureAuthenticated, (request, response) => {
    if(request.params.id){
    User.getOne(request.params.id, function (user) {
        response.render('users/edit_pwd', {user: user})
    })
}
})

// valide une inscription
router.get('/valide/:id', ensureAuthenticated, function (req, res) {
    Role.getOne(req.user.user.ROLEID, function (role) {
        if (role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR') {
            User.Valide(req.params.id, function (users) {
                User.Allu(function (users) {
                    res.render('users/users', {users: users})
                })
            })
            User.getOne(req.params.id, function (users) {
                for (user of users) ;
                let MonUser = [
                    {
                        username: user.USERNAME,
                        usersurname: user.USERSURNAME,
                        email: user.USERLOGIN,
                    },
                ]
                require('../config/emailing')('validation', MonUser);
            })
        } else {
            response.redirect('/')
        }
    })
});

router.get('/monProfile/:id',ensureAuthenticated, function(req, res){
    Role.getOne(req.user.user.ROLEID,function (role) {
        // si admin ou moderateur on va le rediriger vers mon profile dans template admin
        if(role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR'){
            if (req.params.id) {
                User.getOne(req.params.id, function (user) {
                    if (user[0].ROLEID != undefined) {
                        Role.getOne(user[0].ROLEID, function (role) {
                            res.render('users/monProfile', {user: user, role: role[0].ROLENAME})
                        })
                    }
                })
            }

        }else{
            // sinon on va le rediriger vers mon profile dans template front
            if (req.params.id) {
                User.getOne(req.params.id, function (user) {
                    if (user[0].ROLEID != undefined) {
                        Role.getOne(user[0].ROLEID, function (role) {
                            res.render('users/monProfileFront', {user: user, role: role[0].ROLENAME})
                        })
                    }
                })
            }
        }
    })
});

// mon entreprise
router.get('/monEntreprise/:id',ensureAuthenticated, function(req, res){
    Role.getOne(req.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ALUMNI'){
            if (req.params.id) {
                Alumni.getOne(req.params.id, function(alumni){
                    var USERGRADYEAR = dateFormat(alumni[0].USERGRADYEAR,"yyyy-mm-dd")
                    var USERFIRSTHIRINGYEAR = dateFormat(alumni[0].USERFIRSTHIRINGYEAR,"yyyy-mm-dd")
                    var USERHIRINGYEAR = dateFormat(alumni[0].USERHIRINGYEAR,"yyyy-mm-dd")
                    res.render('users/monEntreprise', { alumni: alumni[0], 
                        USERGRADYEAR : USERGRADYEAR,
                        USERFIRSTHIRINGYEAR:USERFIRSTHIRINGYEAR,
                        USERHIRINGYEAR : USERHIRINGYEAR,
                        role : role[0].ROLENAME })
                })}
        }else if(role[0].ROLENAME === 'ENTREPRISE'){
            if (req.params.id) {
                Company.getOne(req.params.id, function(company){
                    res.render('users/monEntreprise', { company: company[0],role : role[0].ROLENAME})
                })}
        }
    })    
});

// mon entreprise edit
router.get('/monEntreprise/edit/:id',ensureAuthenticated, function(req, res){
    Role.getOne(req.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ALUMNI'){
            if (req.params.id) {
                Alumni.getOne(req.params.id, function(alumni){
                    var USERGRADYEAR = dateFormat(alumni[0].USERGRADYEAR,"yyyy-mm-dd")
                    var USERFIRSTHIRINGYEAR = dateFormat(alumni[0].USERFIRSTHIRINGYEAR,"yyyy-mm-dd")
                    var USERHIRINGYEAR = dateFormat(alumni[0].USERHIRINGYEAR,"yyyy-mm-dd")
                    res.render('users/editMonEntreprise', { alumni: alumni[0], 
                        USERGRADYEAR : USERGRADYEAR,
                        USERFIRSTHIRINGYEAR:USERFIRSTHIRINGYEAR,
                        USERHIRINGYEAR : USERHIRINGYEAR })
                })}
        }else if (role[0].ROLENAME === 'ENTREPRISE'){
            Company.getOne(req.params.id, function(company){
                res.render('users/editMonEntreprise', { company: company[0]})
            })
        }
    })    
});

router.post('/updateEntreprise', (req, res) => {
    Role.getOne(req.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ALUMNI'){
            const USERID = req.body.USERID;
            const USERCOMPANY = req.body.USERCOMPANY;
            const USERFUNCTION = req.body.USERFUNCTION;
            const USERHIRINGYEAR = req.body.USERHIRINGYEAR;
            const USERSALARY = req.body.USERSALARY;
            const USERGRADYEAR = req.body.USERGRADYEAR;
        
            Alumni.update(USERCOMPANY, USERFUNCTION, USERHIRINGYEAR, USERSALARY, USERGRADYEAR, USERID, function () {
                req.flash('success', "infos modifiées !")
                res.redirect('monEntreprise/'+USERID)
            })
        }else if(role[0].ROLENAME === 'ENTREPRISE'){
            const USERID = req.body.USERID;
            const COMPANYNAME = req.body.COMPANYNAME;
            const COMPANYDESC = req.body.COMPANYDESC;

            Company.update(COMPANYNAME, COMPANYDESC, USERID, function () {
                req.flash('success', "infos modifiées !")
                res.redirect('monEntreprise/'+USERID)
            })
        }
    });
   
})

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', "vous n'etes pas connecter");
        res.redirect('/login');
    }
}

module.exports = router;