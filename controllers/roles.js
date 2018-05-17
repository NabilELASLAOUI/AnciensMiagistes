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

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/');
    }
}

module.exports = router;