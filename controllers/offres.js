const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

const uploadDir = path.join(__dirname, '/..', 'public/uploads/');
var formidable = require('formidable');
var fs = require('fs');

let Article = require('../models/Article')
let Category = require('../models/Category')

router.get('/:catId', ensureAuthenticated, function (req, res) {

    Article.getByCateg(req.params.catId, function (offres) {
        Category.getOne(req.params.catId, function (la_categorie) {
            res.render('front/offres', {offres: offres, la_categorie: la_categorie});
        })

    })

});

router.get('/detail/:articleId/:catId', ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.articleId, function (article) {
        Category.getOne(req.params.catId, function (la_categorie) {
            res.render('front/detail_offre', {article: article, la_categorie: la_categorie});
        })
    })

});


router.get('/add/:catId', ensureAuthenticated, function (req, res) {
    Category.getOne(req.params.catId, function (la_categorie) {
        res.render('front/ajout_offre', {la_categorie: la_categorie});
    })

});


router.post('/doAdd', ensureAuthenticated, function (req, res) {

    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        var contenu = fields.ARTICLEDESC.length === 0 ? 'Voir la pièce jointe pour plus d\'infos.' : fields.ARTICLEDESC
        var nomFichier = '';
        if (files.ARTICLEDOC.size !== 0) {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');

            if (cheminFichier[cheminFichier.length - 1].match(/\.(jpg|jpeg|png|docx|pdf|doc)$/i)) {
                nomFichier = cheminFichier[cheminFichier.length - 1];
                if (err) res.render('front/ajout_offre', {errors: err})
                Article.create(fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, new Date(), contenu, nomFichier, function () {
                    res.redirect('/offres/' + fields.CATEGORYID)
                })
            } else {
                fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                    }
                });
                Category.getOne(fields.CATEGORYID, function (la_categorie) {
                    res.render('front/ajout_offre', {
                        msg_err: 'Le fichier doit être dans l\'un des format suivant: jpg|jpeg|png|docx|pdf|doc ',
                        la_categorie: la_categorie
                    });
                })
            }
        } else {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');
            if (cheminFichier[cheminFichier.length - 1] === 'fileTodelete') {
                fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                    }
                });
            }
            if (err) res.render('front/ajout_offre', {errors: err})
            Article.create(fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, new Date(), contenu, nomFichier, function () {
                res.redirect('/offres/' + fields.CATEGORYID)
            })
        }


    })
    form.on('fileBegin', function (name, file) {
        if (file.name !== '') {
            var name = 'fichier';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);

        } else {
            var name = 'fileTodelete';
            file.path = path.join(uploadDir, name);
        }

    })

});

router.get('/edit/:offreid/:catID', ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.offreid, function (elem) {
        Category.getOne(req.params.catID, function (la_categorie) {
            res.render('front/edit_offre', {offre: elem, la_categorie: la_categorie})
        })


    })
});

router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        var contenu = fields.ARTICLEDESC.length === 0 ? 'Voir la pièce jointe pour plus d\'infos.' : fields.ARTICLEDESC
        var cheminFichier = files.ARTICLEDOC.path.split('\\');
        var nomFichier = '';
        if (files.ARTICLEDOC.size !== 0) {
            if (fields.ARTICLEDOCNAME.toString().length !== 0) {
                fs.unlink('public/uploads/' + fields.ARTICLEDOCNAME, function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + fields.ARTICLEDOCNAME + ' a été supprimé');
                    }
                });
            }
            if (cheminFichier[cheminFichier.length - 1].match(/\.(jpg|jpeg|png|docx|pdf|doc)$/i)) {
                nomFichier = cheminFichier[cheminFichier.length - 1];
                if (err) res.render('front/ajout_offre', {errors: err})
                Article.update(fields.ARTICLEID, fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, contenu, nomFichier, function () {
                    res.redirect('/offres/' + fields.CATEGORYID)
                })
            } else {
                fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                    }
                });
                Category.getOne(fields.CATEGORYID, function (la_categorie) {
                    Article.getOne(fields.ARTICLEID, function (offre) {
                        res.render('front/edit_offre', {
                            msg_err: 'Le fichier doit être dans l\'un des format suivant: jpg|jpeg|png|docx|pdf|doc ',
                            offre: offre,
                            la_categorie: la_categorie
                        });
                    })

                })
            }

        } else {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');
            if (cheminFichier[cheminFichier.length - 1] === 'fileTodelete') {
                fs.unlink('public/uploads/' + cheminFichier[cheminFichier.length - 1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + cheminFichier[cheminFichier.length - 1] + ' a été supprimé');
                    }
                });
            }
            if (err) res.render('front/edit_offre', {errors: err})
            Article.update(fields.ARTICLEID, fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, contenu, fields.ARTICLEDOCNAME, function () {
                res.redirect('/offres/' + fields.CATEGORYID)
            })
        }


    })
    form.on('fileBegin', function (name, file) {
        if (file.name !== '') {
            var name = 'fichier';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);
        } else {
            var name = 'fileTodelete';
            file.path = path.join(uploadDir, name);
        }

    })
});

router.get('/delete/:offreid/:docname/:catId', ensureAuthenticated, function (req, res) {
    Article.delete(req.params.offreid, function (elem) {
        if (req.params.docname.toString() !== 'sansFichier') {
            fs.unlink('public/uploads/' + req.params.docname, function (err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.warn('le fichier ' + req.params.docname + ' a été supprimé');
                }
            });
        }

        res.redirect('/offres/' + req.params.catId);
    })
});

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Vous devez vous authentifier pour acceder à votre compte');
        res.redirect('/login');
    }
}

module.exports = router;