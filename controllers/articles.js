const express = require('express');
const router = express.Router();
const path = require('path')
const uploadDir = path.join(__dirname, '/..', 'public/uploads/');
var formidable = require('formidable');

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

router.get('/edit.ejs/:articleid',ensureAuthenticated, function (req, res) {
    Article.getOne(req.params.articleid, function (elem) {
        //console.log(elem);
        Category.all(function(cat){
            res.render('articles/edit.ejs', {article: elem,cat:cat});
            console.log(elem)
        });

    })
});

router.get('/delete/:articleid',ensureAuthenticated, function (req, res) {
    Article.delete(req.params.articleid, function (elem) {
        res.redirect('/articles');
    })
});

router.post('/doAdd', ensureAuthenticated, function (req, res) {

    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function(err, fields, files) {
        if(err) res.render('articles/add', { errors: err})
        Article.create(fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, fields.ARTICLEDATE, fields.ARTICLEDESC, files.ARTICLEDOC.name, function () {
            req.flash('success', "Article ajouté avec succès !")
            res.redirect('/articles')
        })

    })
    form.on('fileBegin', function (name, file) {
        if(file.name!=='')
            file.path = path.join(uploadDir, file.name)


    })

});

router.post('/doEdit', ensureAuthenticated, function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, function(err, fields, files) {
        if(err) res.render('articles/edit.ejs', { errors: err})
        var doc = files.ARTICLEDOC.name!=='' ? files.ARTICLEDOC.name : fields.ARTICLEDOCNAME;
        console.log(doc);
        Article.update(fields.ARTICLEID, fields.USERID, fields.CATEGORYID, fields.ARTICLENAME, fields.ARTICLEDATE, fields.ARTICLEDESC, doc, function () {
            req.flash('success', "Article modifié avec succès !")
            res.redirect('/articles')
        })

    })
    form.on('fileBegin', function (name, file) {
        if(file.name!=='')
            file.path = path.join(uploadDir, file.name)


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