let express =  require('express')
let app =express() // moteur de template
const path = require('path');

let bodyParse = require('body-parser')
let session = require('express-session')


// moteur de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

// Middleware
app.use(express.static('public')) // pour acceder aux dossiers dans public prefix assets
app.use(bodyParse.urlencoded({extended : false}))
app.use(bodyParse.json())

app.use(session({
    secret: 'azeazazas',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(require('./Middlewares/flash'))


// routes
app.get('/',(request,response)=>{
    response.render('index')
})

let users = require('./controllers/users');
app.use('/users', users);

let roles = require('./controllers/roles');
app.use('/roles', roles);


app.listen(8080)