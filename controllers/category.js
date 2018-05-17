const express = require('express');
const router = express.Router();

let Category = require('../models/Category')


router.get('/', ensureAuthenticated, (request, response) => {
    Category.all(function (cat) {
        response.render('categories/categories', { cat: cat })
    })
})

router.get('/create', ensureAuthenticated, (request, response) => {
    response.render('categories/create')
})

router.post('/create', ensureAuthenticated, (request, response) => {

    request.checkBody('CATEGORYNAME', 'Saisissez une categorie').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Category.all(function (cat) {
            response.render('categories/create', { cat: cat, errors: errors })
        })
    } else {
        Category.create(request.body.CATEGORYNAME, function () {
            request.flash('success', "categorie bien ajouté !")
            response.redirect('/category')
        })
    }
})

router.get('/delete/:id', ensureAuthenticated, (request, response) => {
    if (request.params.id){
        Category.delete_(request.params.id, function(){
            request.flash('success', "Catégorie supprimée")
        })
    }
    response.redirect('/category')
})

router.post('/update', ensureAuthenticated, (request, response) => {
    request.checkBody('CATEGORYNAME', 'Saisissez une categorie').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Category.all(function (cat) {
            response.render('categories/edit', { cat: cat, errors: errors })
        })
    } else {
        Category.update(request.body.CATEGORYNAME,request.body.CATEGORYID, function () {
            request.flash('success', "categorie modifiée !")
            response.redirect('/category')
        })
    }
})

router.get('/edit/:id', ensureAuthenticated, (request, response) => {
    if (request.params.id) {
        Category.getOne(request.params.id, function(cat){
            response.render('categories/edit', { cat: cat })
        })
    }
})

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', "vous n'etes pas connecter");
        res.redirect('/');
    }
}

module.exports = router;