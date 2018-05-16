let express =  require('express')
let app = express()
const path = require('path');

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

let category = require('./controllers/category');
app.use('/category', category);

app.listen(8080)