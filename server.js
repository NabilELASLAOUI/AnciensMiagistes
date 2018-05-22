let express =  require('express')
let app =express() // moteur de template
const path = require('path');
let Role = require('./models/Role')

let bodyParse = require('body-parser')
let session = require('express-session')
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let passport = require('passport');


// moteur de template express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

// Middleware session
app.use(express.static('public')) // pour acceder aux dossiers dans public prefix assets
app.use(bodyParse.urlencoded({extended : false}))
app.use(bodyParse.json())

app.use(session({
    secret: 'azeazazas',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);;
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req,res,next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    if (req.user != undefined){
        res.locals.nom = req.user.user.USERNAME;
        res.locals.prenom = req.user.user.USERSURNAME;
        res.locals.idUser = req.user.user.USERID;
        res.locals.adresse = req.user.user.USERADDRESS;
        res.locals.phone = req.user.user.USERPHONE;
        res.locals.email = req.user.user.USERLOGIN;
        Role.getOne(req.user.user.ROLEID,function (role) {
            app.locals.role= role[0].ROLENAME
        })
    }
    next();
})

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// routes
app.get('/',(request,response)=>{
    response.render('index')
})

let users = require('./controllers/users');
app.use('/users', users);

let roles = require('./controllers/roles');
app.use('/roles', roles);

let articles = require('./controllers/articles');
app.use('/articles', articles);
let category = require('./controllers/category');
app.use('/category', category);

let company = require('./controllers/company');
app.use('/company', company);

let rapport = require('./controllers/rapport');
app.use('/rapports', rapport);

app.listen(8080)