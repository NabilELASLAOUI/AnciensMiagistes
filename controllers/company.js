const express = require('express');
const router = express.Router();

let Company = require('../models/Company')
let User = require('../models/User')


router.get('/', (request, response) => {
    Company.all(function (comp) {
        response.render('companies/companies', { comp: comp })
    })
})

router.get('/create', (request, response) => {
	User.allUsers(function (users) {
        response.render('companies/create',{users:users})
    })
})

router.post('/create', (request, response) => {

    request.checkBody('COMPANYNAME', 'Saisissez une compagnie').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Company.all(function (comp) {
            response.render('companies/create', { comp: comp, errors: errors })
        })
    } else {
		Company.create(request.body.USERID, request.body.COMPANYNAME, request.body.COMPANYDESC, function () {
            request.flash('success', 'Compagnie bien ajoutée !')
            response.redirect('/company')
        })
    }
})

router.get('/delete/:id',(request, response) => {
    if (request.params.id){
        Company.delete_(request.params.id, function(){
            request.flash('success', 'Compagnie supprimée')
        })
    }
    response.redirect('/company')
})

router.post('/update', (request, response) => {
    request.checkBody('COMPANYNAME', 'Saisissez une compagnie').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Company.all(function (comp) {
            response.render('companies/edit', {comp: comp, errors: errors})
        })
    } else {
        Company.update(request.body.COMPANYNAME,request.body.COMPANYDESC, request.body.USERID, function () {
            request.flash('success', 'Compagnie modifiée !')
            response.redirect('/company')
        })
    }
})

router.get('/edit/:id', (request, response) => {
    if (request.params.id) {
        Company.getOne(request.params.id, function(comp){
            response.render('companies/edit', {comp: comp})
        })
    }
})


module.exports = router;