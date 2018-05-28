const express = require('express');
const router = express.Router();

let Role = require('../models/Role')


	/**
	* Liste les différents roles
	**/
router.get('/',ensureAuthenticated,(request,response)=>{
    Role.getOne(request.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ADMIN'){
            Role.all(function (roles) {
                response.render('roles/roles',{roles:roles})
            })
        }else{
            response.redirect('/')
        }
    })
})

    /**
	* formulaire d'ajout d'un role
	**/
router.get('/create', ensureAuthenticated, (request, response) => {
    Role.getOne(request.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ADMIN'){
            Role.all(function (roles) {
                response.render('roles/create')
            })
        }else{
            response.redirect('/')
        }
    })
})

    /**
	* Permet d'ajouter un role
	**/
router.post('/create', (request,response)=>{

    request.checkBody('ROLENAME','Saisissez un role').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if(errors){
        Role.all(function (roles) {
            response.render('roles/create',{roles:roles,errors:errors})
        })
    } else {
        Role.create(request.body.ROLENAME.toUpperCase(), function () {
            request.flash('success',"role bien ajouté !")
            response.redirect('/roles')
        })
    }
})
    /**
	* Permet de supprimer un role
	**/
router.get('/delete/:id', ensureAuthenticated, (request, response) => {

    Role.getOne(request.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ADMIN'){
            if (request.params.id){
                Role.delete(request.params.id, function(){
                    request.flash('success', "Role supprimée")
                })
            }
            response.redirect('/roles')
        }else{
            response.redirect('/')
        }
    })
})

    /**
	* formulaire de modification d'un role
	**/
router.get('/edit/:id', ensureAuthenticated, (request, response) => {

    Role.getOne(request.user.user.ROLEID,function (role) {
        if(role[0].ROLENAME === 'ADMIN'){
            if (request.params.id) {
                Role.getOne(request.params.id, function(role){
                    response.render('roles/edit.ejs', {role: role})
                })
            }
        }else{
            response.redirect('/')
        }
    })
})
    /**
	* Permet d'éditer un role
	**/
router.post('/update', (request, response) => {
    request.checkBody('ROLENAME', 'Saisissez un role').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Role.all(function (role) {
            response.render('roles/edit.ejs', {role: role, errors: errors})
        })
    } else {
        Role.update(request.body.ROLENAME.toUpperCase(),request.body.ROLEID, function () {
            request.flash('success', "role modifiée !")
            response.redirect('/roles')
        })
    }
})

    /**
    * Permet de renvoyer l'utilisateur à la page d'authentification s'il n'est pas authentifié
    * Cette methode est gérer par passport
	**/
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', "vous n'etes pas connecter");
        res.redirect('/login');
    }
}

    /**
	* Permet d'exporter router pour qu'il soit accessible  par d'autres classes
	**/
module.exports = router;