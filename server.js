let express =  require('express')
let app =express()
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
        /**
         * renvoyer à la vue la liste des catégories à mettre dans le menu
         */
        global.catMenu= cats;
    })

    /**
     * renvoyer à la vue l'actualité
     */
    Category.catActu(function (actu) {
        global.actu= actu;

    })

    /**
     * envoyer un boolean (isAuthenticated renvoyé par la fonction isAuthenticated()) à la vue 
     * pour tester si un utilisateur est authentifié ou pas
     */ 
    res.locals.isAuthenticated = req.isAuthenticated();
    /**
     * renvoyer pageCourante à la vue qui sert à activer la rubrique courante class="active"
     */
    app.locals.pageCourante = req.path
    /**
     * renvoyer à la vue les informations de l'utilisateur authentifié
     */
    if (req.user != undefined){
        res.locals.nom = req.user.user.USERNAME;
        res.locals.prenom = req.user.user.USERSURNAME;
        res.locals.idUser = req.user.user.USERID;
        res.locals.adresse = req.user.user.USERADDRESS;
        res.locals.phone = req.user.user.USERPHONE;
        res.locals.email = req.user.user.USERLOGIN;
        /**
         * récupérer le role de l'utilisateur authentifié et le renvoyer à la vue
         */
        Role.getOne(req.user.user.ROLEID,function (role) {
            app.locals.role= role[0].ROLENAME
        })
        /**
         * renvoyer à la vue la liste des catégories
         */
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
    Article.getAllArticles(function (articles) {
        for (article of articles){
        }
        response.render('index', { articles: articles })
    })
})
// route vers page d'authentification
app.get('/login',(request,response)=>{
    response.render('login')
})

// route vers page à propos
app.get('/apropos',(request,response)=>{
    response.render('front/apropos')
})

// route vers page contact
app.get('/contact',(request,response)=>{
    response.render('front/contact')
})

app.post('/contact', (request, response) => {
    request.checkBody('name', 'Entrer un nom!').notEmpty();
    request.checkBody('email', 'Entrer un email!').notEmpty();
    request.checkBody('message', 'Entrer un message!').notEmpty();
    // Get Errors
    let errors = request.validationErrors();

    if (errors) {
        Category.all(function (cat) {
            response.render('front/contact', {errors: errors })
        })
    }else{
        let MonUser = [
        {
            username: request.body.name,
            useremail: request.body.email,
            usermessage: request.body.message,
            email: 'miagemulhousetest@gmail.com',
        }
        ]
        require('./config/emailing')('contact', MonUser);
        response.render('front/contact')
    }
    
})

app.get('/mma', (request, response) => {
    response.render('front/mma')
})

app.get('/miagemulhouse', (request, response) => {
    response.render('front/miagemulhouse')
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