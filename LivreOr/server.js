let express =  require('express')
let app =express() // moteur de template

let bodyParse = require('body-parser')
let session = require('express-session')


// moteur de template
app.set('view engine','ejs')

// Middleware
app.use('/assets',express.static('public')) // pour acceder aux dossiers dans public prefix assets
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
    console.log(request.session)
    response.render('pages/index')
})

app.post('/', (request,response)=>{
    if (request.body.message === undefined || request.body.message === ''){
        request.flash('error',"vous n'avez pas posté de message")
        response.redirect('/')
    }
})

app.listen(8080)