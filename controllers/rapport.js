/*
 * Ce controlleur est utiliser pour la gestion des rapport
 * de stage coté administrateur
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

const uploadDir = path.join(__dirname, '/..', 'public/uploads/');
var formidable = require('formidable');
var fs = require('fs');

let Rapport = require('../models/Rapport')
let User = require('../models/User')

//Liste les rapport de stages
router.get('/', ensureAuthenticated, function (req, res) {

    Rapport.all(function (rapports) {
        User.allUsers(function (users) {
            res.render('rapports/list', {rapports: rapports, users: users});
        });

    })

});


//accès au formulaire d'ajout d'un rapport de stage
router.get('/add', ensureAuthenticated, function (req, res) {

    res.render('rapports/add');

});

// ajout d'un rapport de stage
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

                res.render('rapports/add', {msg_err: msg})
            } else {
                var nomFichier = '';
                if (files.RAPPORTDOC.size !== 0) {
                    var cheminFichier = files.RAPPORTDOC.path.split('\\');
                    nomFichier = cheminFichier[cheminFichier.length - 1];

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
                }
                if (err) res.render('rapports/add', {errors: err})
                Rapport.create(fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, new Date(), nomFichier, function () {
                    req.flash('success', "Rapport ajouté avec succès !")
                    res.redirect('/rapports')
                })
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

// accès au formulaire de modification d'un rapport de stage
router.get('/edit/:rapportid', ensureAuthenticated, function (req, res) {
    Rapport.getOne(req.params.rapportid, function (elem) {
        res.render('rapports/edit', {rapport: elem});
    });
});

// Modification d'un rapport de stage
router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        var email = fields.USEREMAIL.toString().split('@');
        if (email[1].toLocaleLowerCase() === 'uha.fr') {
            var msg = "l\'adresse email ne doit pas être une adresse UHA";
            Rapport.getOne(fields.RAPPORTID, function (elem) {
                res.render('rapports/edit', {msg_err: msg, rapport: elem})
            });

        } else {
            var nomFichier = '';
            if (files.RAPPORTDOC.size !== 0) {
                var cheminFichier = files.RAPPORTDOC.path.split('\\');
                nomFichier = cheminFichier[cheminFichier.length - 1];
                if (fields.RAPPORTDOCNAME.toString().length !== 0) {
                    fs.unlink('public/uploads/' + fields.RAPPORTDOCNAME, function (err) {
                        if (err) {
                            console.error(err.toString());
                        } else {
                            console.warn('le fichier ' + fields.RAPPORTDOCNAME + ' a été supprimé');
                        }
                    });
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
            }
            if (err) res.render('rapports/edit.ejs', {errors: err})
            var doc = files.RAPPORTDOC.size !== 0 ? nomFichier : fields.RAPPORTDOCNAME;
            Rapport.update(fields.RAPPORTID, fields.USERID, fields.USEREMAIL, fields.RAPPORTNAME, doc, function () {
                req.flash('success', "Rapport modifié avec succès !")
                res.redirect('/rapports')
            })
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

// Suppression d'un rapport de stage
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

        res.redirect('/rapports');
    })
});

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Vous devez vous authentifier pour acceder au contenu de cette page');
        res.redirect('/login');
    }
}

module.exports = router;