//console.log('salut')

const EventEmitter = require('events');

let monEcouteur = new EventEmitter();

monEcouteur.on('saute' , function (a , b) {
    console.log("j'ai saute", a ,b)
})


monEcouteur.emit('saute', 10, 20)
//Lorsque cet evenement sera emit, il va declanche l'ecouteur

monEcouteur.emit('saute')
monEcouteur.emit('saute')
monEcouteur.emit('saute')

//notre variable server est un event listener
//a l interieur de la classe http.createServer, on a un emit,
//et ca emit un evenement de type request et lui passe les parametres

// c est cette architecture qu il faut comprendre pour comprendre comme fonctionne l interieur du framework

/*
let http = require('http')
let fs = require('fs')
let url = require('url')

let server = http.createServer()

server.on('request', (request, response)=>{    // function(request, response){} c'est parreille que (request, response)=>{}
    response.writeHead(200)
    let query = url.parse(request.url,true).query
    let name = query.name === undefined ? 'anonyme' : query.name
    fs.readFile('index.html','utf8',(err,data)=>{

        if (err){
            response.writeHead(404)
            response.end("le fichier n'existe pas")
        }else{
            response.writeHead(200, {
                'Content-type' : 'text/html; charset=utf-8'
            })
            data = data.replace('{{ name }}', name)
            response.end(data)
        }

    })


})

server.listen(8080)

*/