const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

const uploadDir = path.join(__dirname, '/..', 'public/uploads/');
var formidable = require('formidable');
var fs=require('fs');

let Article = require('../models/Article')
let Category = require('../models/Category')

router.get('/',ensureAuthenticated, function (req, res) {

    Article.all(function (articles) {

        res.render('articles/list', {articles: articles});
    })

});

router.get('/add',ensureAuthenticated, function (req, res) {
    Category.all(function(cat){
        res.render('articles/add',{cat:cat});
    });

});


router.get('/edit/:articleid',ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.articleid, function (elem) {
        //console.log(elem);
        Category.all(function (cat) {
            res.render('articles/edit.ejs', {article: elem, cat: cat});
            console.log(elem)
        });

    })
});

router.post('/doAdd', ensureAuthenticated, function (req, res) {

    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function(err, fields, files) {
        var nomFichier='';
        if(files.ARTICLEDOC.size!==0){
            var cheminFichier=files.ARTICLEDOC.path.split('\\');
            nomFichier=cheminFichier[cheminFichier.length-1];
        }else{
            var cheminFichier=files.ARTICLEDOC.path.split('\\');
            if(cheminFichier[cheminFichier.length-1]==='fileTodelete'){
                fs.unlink('public/uploads/'+cheminFichier[cheminFichier.length-1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier '+cheminFichier[cheminFichier.length-1] + ' a été supprimé');
                    }
                });
            }
        }
        if(err) res.render('articles/add', { errors: err})
        Article.create(fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, fields.ARTICLEDATE, fields.ARTICLEDESC, nomFichier, function () {
            req.flash('success', "Article ajouté avec succès !")
            res.redirect('/articles')
        })

    })
    form.on('fileBegin', function (name, file) {
        if(file.name!=='') {
            var name='fichier';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);

        }else{
            var name='fileTodelete';
            file.path = path.join(uploadDir, name);
            console.log( file.path)
        }

    })

});

router.get('/edit/:articleid',ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.articleid, function (elem) {
        //console.log(elem);
        Category.all(function(cat){
            res.render('articles/edit', {article: elem,cat:cat});
            //console.log(elem)
        });

    })
});


router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function(err, fields, files) {
        if(err) res.render('articles/edit', { errors: err});
        if( files.ARTICLEDOC.name!=='') {
            var cheminFichier = files.ARTICLEDOC.path.split('\\');
            var nomFichier = cheminFichier[cheminFichier.length - 1];
        }else{
            var cheminFichier=files.ARTICLEDOC.path.split('\\');
            if(cheminFichier[cheminFichier.length-1]==='fileTodelete'){
                fs.unlink('public/uploads/'+cheminFichier[cheminFichier.length-1], function (err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.warn('le fichier '+cheminFichier[cheminFichier.length-1] + ' a été supprimé');
                    }
                });
            }
        }
        var doc = files.ARTICLEDOC.name!=='' ? nomFichier : fields.ARTICLEDOCNAME;
        if (err) res.render('articles/edit.ejs', {errors: err})
        var doc = files.ARTICLEDOC.name !== '' ? files.ARTICLEDOC.name : fields.ARTICLEDOCNAME;
        Article.update(fields.ARTICLEID, fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, fields.ARTICLEDATE, fields.ARTICLEDESC, doc, function () {
            req.flash('success', "Article modifié avec succès !")
            res.redirect('/articles')
        })

    })
    form.on('fileBegin', function (name, file) {
        if(file.name!=='') {
            var name = 'fichier';
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${name}_${new Date().getTime()}.${fileExt}`);
        }else{
            var name='fileTodelete';
            file.path = path.join(uploadDir, name);
            console.log( file.path)
        }

    })
});

router.get('/delete/:articleid/:docname',ensureAuthenticated, function (req, res) {
    Article.delete(req.params.articleid, function (elem) {
        if(req.params.docname.toString()!=='sansFichier'){
            fs.unlink('public/uploads/'+req.params.docname, function (err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.warn('le fichier '+req.params.docname + ' a été supprimé');
                }
            });
        }

        res.redirect('/articles');
    })
});
// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Vous devez vous authentifier pour acceder a votre compte');
        res.redirect('/');
    }
}
module.exports = router;