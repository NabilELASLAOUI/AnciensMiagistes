const express = require('express');
const router = express.Router();

let Role = require('../models/Role')




router.get('/',(request,response)=>{
    Role.all(function (roles) {
        response.render('roles/roles',{roles:roles})
    })
})

router.post('/Create', (request,response)=>{
    if (request.body.ROLENAME === undefined || request.body.ROLENAME === ''){
        request.flash('error',"vous n'avez pas posté de role")
        //   response.redirect('/')
    }else{
        Role.create(request.body.ROLENAME, function () {
            request.flash('success',"role bien ajouté !")
            response.redirect('/roles')
        })
    }
})

module.exports = router;