const express = require('express');
const router = express.Router();

let Role = require('../models/Role')



router.get('/',ensureAuthenticated,(request,response)=>{
    Role.all(function (roles) {
        response.render('roles/roles',{roles:roles})
    })
})

router.get('/create',(request,response)=>{
        response.render('roles/create')
})

router.post('/create', (request,response)=>{

    request.checkBody('ROLENAME','Saisissez un role').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if(errors){
        Role.all(function (roles) {
            response.render('roles/create',{roles:roles,errors:errors})
        })
    } else {
        Role.create(request.body.ROLENAME, function () {
            request.flash('success',"role bien ajouté !")
            response.redirect('/roles')
        })
    }
})

router.get('/delete/:id',(request, response) => {
    if (request.params.id){
        Role.delete(request.params.id, function(){
            request.flash('success', "Role supprimée")
        })
    }
    response.redirect('/roles')
})

router.post('/update', (request, response) => {
    request.checkBody('ROLENAME', 'Saisissez un role').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Role.all(function (role) {
            response.render('roles/edit', { role: role, errors: errors })
        })
    } else {
        Role.update(request.body.ROLENAME,request.body.ROLEID, function () {
            request.flash('success', "role modifiée !")
            response.redirect('/roles')
        })
    }
})

router.get('/edit/:id', (request, response) => {
    if (request.params.id) {
        Role.getOne(request.params.id, function(role){
            response.render('roles/edit', { role: role })
        })
    }
})


// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', "vous n'etes pas connecter");
        res.redirect('/');
    }
}

module.exports = router;