const express = require('express');
const router = express.Router();

let User = require('../models/User')



// Register Form
router.get('/register', function(req, res){
    res.render('users/register');
});

router.post('/login', (request,response)=>{
    if (request.body.USERLOGIN === undefined || request.body.USERPWD === ''){
        request.flash('error',"vous n'avez pas posté de login")
        response.redirect('/')
    }else{
        var crypto = require('crypto')
            , shasum = crypto.createHash('sha1');
        shasum.update(request.body.USERPWD);
        User.login(request.body.USERLOGIN,shasum.digest('hex'), function (user) {
            if (user){
                response.redirect('/roles')
            }else{
                response.redirect('/')
            }
        })
    }
})
module.exports = router;