const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

const uploadDir = path.join(__dirname, '/..', 'public/uploads/');
var formidable = require('formidable');
var fs = require('fs');

let Rapport = require('../models/Rapport')
let User = require('../models/User')
let Role = require('../models/Role')
router.get('/', ensureAuthenticated, function (req, res) {

    Rapport.all(function (rapports) {
        Rapport.getOneByUser(res.locals.idUser, function (mon_rapport) {
            User.allUsers(function (users) {
                res.render('front/rapports_stages', {rapports: rapports, users: users, mon_rapport: mon_rapport});
            })
        });

    })

});

router.get('/add', function (req, res) {

    res.render('front/ajout_rapport');

});


router.post('/doAdd', ensureAuthenticated, function (req, res) {

    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        Rapport.getOneByUser(fields.USERID, function (usr) {

            var email = fields.USEREMAIL.toString().split('@');
            if (email[1].toLocaleLowerCase() === 'uha.fr') {
                var msg = "l\'adresse email ne doit pas être une adresse UHA";
                var cheminFichier = files.RAPPORTDOC.path.split('\\');
                fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                    }
                });

                res.render('front/ajout_rapport', {msg_err: msg})
            } else {
                var nomFichier = '';
                if (files.RAPPORTDOC.size !== 0) {
                    var cheminFichier = files.RAPPORTDOC.path.split('\\');
                    if (cheminFichier[cheminFichier.length - 1].match(/\.(docx|pdf)$/i)) {
                        nomFichier = cheminFichier[cheminFichier.length - 1];
                        if (err) res.render('front/ajout_offre', {errors: err})
                        Rapport.create(fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, new Date(), nomFichier, function () {
                            res.redirect('/rapportStages')

                        })
                    } else {
                        fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                            if (err) {
                                console.error(err.toString());
                            } else {
                                console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                            }
                        });
                        res.render('front/ajout_rapport', {
                            msg_err: 'Le fichier doit être dans l\'un des format suivant: docx|pdf '
                        });
                    }

                } else {
                    var cheminFichier = files.RAPPORTDOC.path.split('\\');
                    if (cheminFichier[cheminFichier.length - 1] === 'fileTodelete') {
                        fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                            if (err) {
                                console.error(err.toString());
                            } else {
                                console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                            }
                        });
                    }
                    Rapport.create(fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, new Date(), nomFichier, function () {
                        res.redirect('/rapportStages')

                    })
                }

            }

        })

    })

    form.on('fileBegin', function (name, file) {
        if (file.name !== '') {
            var name = 'rapport';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);

        } else {
            var name = 'fileTodelete';
            file.path = path.join(uploadDir, name);
            console.log(file.path)
        }

    })

});

router.get('/edit/:rapportid', ensureAuthenticated, function (req, res) {
    Rapport.getOne(req.params.rapportid, function (elem) {
        res.render('front/edit_rapport', {rapport: elem});
    });
});


router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        if (err) res.render('front/ajout_offre', {errors: err})
        var email = fields.USEREMAIL.toString().split('@');
        if (email[1].toLocaleLowerCase() === 'uha.fr') {
            var msg = "l\'adresse email ne doit pas être une adresse UHA";
            Rapport.getOne(fields.RAPPORTID, function (elem) {
                res.render('front/edit', {msg_err: msg, rapport: elem})
            });

        } else {
            var nomFichier = '';
            if (files.RAPPORTDOC.size !== 0) {
                var cheminFichier = files.RAPPORTDOC.path.split('\\');
                if (fields.RAPPORTDOCNAME.toString().length !== 0) {
                    fs.unlink('public/uploads/' + fields.RAPPORTDOCNAME, function (err) {
                        if (err) {
                            console.error(err.toString());
                        } else {
                            console.warn('le fichier ' + fields.RAPPORTDOCNAME + ' a été supprimé');
                        }
                    });
                }
                if (cheminFichier[cheminFichier.length - 1].match(/\.(docx|pdf)$/i)) {
                    nomFichier = cheminFichier[cheminFichier.length - 1];
                    Rapport.update(fields.RAPPORTID, fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, nomFichier, function () {
                        res.redirect('/rapportStages')
                    })
                } else {
                    fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                        if (err) {
                            console.error(err.toString());
                        } else {
                            console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                        }
                    });
                    Rapport.getOne(fields.RAPPORTID,function(rapport){
                        res.render('front/edit_rapport', {
                            msg_err: 'Le fichier doit être dans l\'un des format suivant: docx|pdf ',
                            rapport:rapport
                        });
                    })

                }

            } else {
                var cheminFichier = files.RAPPORTDOC.path.split('\\');
                console.log(cheminFichier[cheminFichier.length - 1]);
                if (cheminFichier[cheminFichier.length - 1] === 'fileTodelete') {
                    fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                        if (err) {
                            console.error(err.toString());
                        } else {
                            console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                        }
                    });
                }
                Rapport.update(fields.RAPPORTID, fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, fields.RAPPORTDOCNAME, function () {
                    res.redirect('/rapportStages')
                })
            }

        }
    })
    form.on('fileBegin', function (name, file) {
        if (file.name !== '') {
            var name = 'rapport';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);
        } else {
            var name = 'fileTodelete';
            file.path = path.join(uploadDir, name);
            console.log(file.path)
        }

    })
});

router.get('/delete/:rapportid/:docname', ensureAuthenticated, function (req, res) {
    Rapport.delete(req.params.rapportid, function (elem) {
        if (req.params.docname.toString() !== 'sansFichier') {
            console.log(req.params.docname)
            fs.unlink('public/uploads/' + req.params.docname, function (err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.warn('le fichier ' + req.params.docname + ' a été supprimé');
                }
            });
        }

        res.redirect('/rapportStages');
    })
});

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Vous devez vous authentifier pour acceder a votre compte');
        res.redirect('/login');
    }
}

module.exports = router;