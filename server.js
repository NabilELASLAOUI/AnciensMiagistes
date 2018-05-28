let express =  require('express')
let app =express() // moteur de template
const path = require('path');
let Role = require('./models/Role')
let Category = require('./models/Category')
let Article = require('./models/Article')

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
    Category.catMenu(function (cats) {
        app.locals.catMenu= cats;

    })

    Category.catActu(function (actu) {
        app.locals.actu= actu;

    })
<<<<<<< HEAD

=======
    
>>>>>>> 0c681ddf590e68f42010f3f4e3cbfbcbd12de105
    res.locals.isAuthenticated = req.isAuthenticated();
    app.locals.pageCourante = req.path
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
        Category.all(function (cats) {
            app.locals.cats= cats;
        })

    }
    next();
})

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// page d'accueil
app.get('/',(request,response)=>{
    response.render('index')
})
// routes
app.get('/login',(request,response)=>{
    response.render('login')
})

// routes
app.get('/apropos',(request,response)=>{
    response.render('front/apropos')
})

app.get('/contact',(request,response)=>{
    response.render('front/contact')
})

app.get('/actualites/:catId', function (req, res) {

    Article.getByCateg(req.params.catId,function (actualites) {
        Category.getOne(req.params.catId,function (la_categorie) {
            res.render('front/actualites', {actualites: actualites,la_categorie:la_categorie});
        })

    })

});

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

let rapportStage = require('./controllers/rapport_stage');
app.use('/rapportStages', rapportStage);

let offres = require('./controllers/offres');
app.use('/offres', offres);


app.listen(8080)