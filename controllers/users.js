let express = require('express');
let router = express.Router();
let config = require('../config/db');
let User = require('../models/User')
let Role = require('../models/Role')
let passport = require('passport');
const bcrypt = require('bcrypt');

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
    req.flash('success', 'Vous êtes déconnectés');
    res.redirect('/');

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
                            req.flash('success', "user bien ajouté !")
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
    User.update(USERNAME, USERSURNAME, USERPHONE, USERADDRESS, USERLOGIN, ROLEID, USERID, function () {
        req.flash('success', "user modifiée !")
        res.redirect('/users')
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

router.get('/edit/:id', ensureAuthenticated, (request, response) => {
    if(request.params.id
)
{
    User.getOne(request.params.id, function (user) {
        Role.all(function (roles) {
            response.render('users/edit', {user: user, roles: roles})
        })
    })
}
})
router.get('/edit_pwd/:id', ensureAuthenticated, (request, response) => {
    if(request.params.id
)
{
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

// mon Profile
router.get('/monProfile/:id', ensureAuthenticated, function (req, res) {
    Role.getOne(req.user.user.ROLEID, function (role) {
        if (role[0].ROLENAME === 'ADMIN' || role[0].ROLENAME === 'MODERATEUR') {
            if (req.params.id) {
                User.getOne(req.params.id, function (user) {
                    if (user[0].ROLEID != undefined) {
                        Role.getOne(user[0].ROLEID, function (role) {
                            res.render('users/monProfile', {user: user, role: role[0].ROLENAME})
                        })
                    }
                })
            }
        } else {
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