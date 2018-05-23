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

    Article.getByCateg(req.params.catId,function (articles) {
        Category.getOne(req.params.catId,function (la_categorie) {
            res.render('articles/list', {articles: articles,la_categorie:la_categorie});
        })

    })

});

router.get('/add/:catId', ensureAuthenticated, function (req, res) {
    Category.getOne(req.params.catId,function (la_categorie) {
        res.render('articles/add', {la_categorie: la_categorie});
    })

});


router.post('/doAdd', ensureAuthenticated, function (req, res) {

    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        var nomFichier = '';
        if (files.ARTICLEDOC.size !== 0) {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');
            nomFichier = cheminFichier[cheminFichier.length - 1];
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
        }
        if (err) res.render('articles/add/'+fields.CATEGORYID, {errors: err})
        Article.create(fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, new Date(), fields.ARTICLEDESC, nomFichier, function () {
            req.flash('success', "Article ajouté avec succès !")
            res.redirect('/articles/'+fields.CATEGORYID)
        })

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

router.get('/edit/:articleid', ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.articleid, function (elem) {
            res.render('articles/edit', {article: elem})

    })
});

router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function (err, fields, files) {
        var nomFichier = '';
        if (files.ARTICLEDOC.size !== 0) {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');
            nomFichier = cheminFichier[cheminFichier.length - 1];
            if(fields.ARTICLEDOCNAME.toString().length!==0) {
                fs.unlink('public/uploads/' + fields.ARTICLEDOCNAME, function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier ' + fields.ARTICLEDOCNAME + ' a été supprimé');
                    }
                });
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
        }
        if (err) res.render('articles/edit.ejs', {errors: err})
        var doc = files.ARTICLEDOC.size !== 0 ? nomFichier : fields.ARTICLEDOCNAME;
        Article.update(fields.ARTICLEID, fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, fields.ARTICLEDESC, doc, function () {
            req.flash('success', "Article modifié avec succès !")
            res.redirect('/articles/'+fields.CATEGORYID)
        })

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

router.get('/delete/:articleid/:docname/:catId', ensureAuthenticated, function (req, res) {
    Article.delete(req.params.articleid, function (elem) {
        if (req.params.docname.toString() !== 'sansFichier') {
            fs.unlink('public/uploads/' + req.params.docname, function (err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.warn('le fichier ' + req.params.docname + ' a été supprimé');
                }
            });
        }

        res.redirect('/articles/'+req.params.catId);
    })
});

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Vous devez vous authentifier pour acceder a votre compte');
        res.redirect('/');
    }
}

module.exports = router;