//On gere ici les Streams / flux de donnees


//script capable de copie un fichier



/*
let fs = require('fs')
//ici  data sera un buffer
fs.readFile('demo.mp4' , (err, data) => {
	if (err) throw err
	fs.writeFile('copy.mp4', data, (err) => {
		if (err) throw err
			console.log('Le fichier a bien ete copie')
	})
})
*/



//On lit ici le fichier , et on se retrouve avec une variable data qui va contenir l esble du fichier
//ce qui n est pas tres terrible en terme de performance
//Si on lit un gros fichier de 10 ou 20 Go , pendant ce processus on va depasser la memoire attibué a NodeJS

//Si on ecrit sur un disque dur different de celui de la lecture , on peut faire les chose simultanément,
//on lit un morceau et on l'ecrit

//le principe du flux va nou permettre de resoudre ce probleme
//l idee est de lire un fichier et d avoir un evenement qui permet de lire bloc par bloc



let fs = require('fs')
let file = 'demo.mp4'


//j'utilise stat pour pouvoir connaitre l etat de progression de mon fichier
fs.stat(file , (err, stat) => {

    let total = stat.size

    let progress = 0

    let read = fs.createReadStream(file)

    let write = fs.createWriteStream('demo-copy.mp4')

    //on peut greffer un 2eme stream d ecriture avec le meme stream de lecture
    let write2 = fs.createWriteStream('demo-copy2.mp4')

    //chunk est un morceau , ici de type buffer
    //http://devdocs.io/node/stream#stream_class_stream_readable
    read.on('data', (chunk) => {

        progress += chunk.length
        console.log('J ai lu ' + Math.round( (100*progress/total)) + "%" )
    } )


    //j envoie les info que tu veux ecrire au writable stream
    //en interne NodeJS va se charger de gere les cas ou on a des pauses, ...
    read.pipe(write)
    read.pipe(write2)

    //on ecoute le finish
    write.on('finish', ()=> {
        console.log('Le fichier a bien ete copié')
    })

})


/*
--- Piping streams : taking the output of one stream and feeding it into the input of another ---
Contrairement a la methode precedante , on lit le fichier au fur et a mesure
Ce qui veut dire que dans cette variable chunk , je n ai qu une partie du fichier
donc je n est pas a stocker une grande partie d info pour pouvoir l utiliser plus tard
l autre avantage c est que les flux peuvent etre greffés les un aux autres avec fs.createWriteStream
Ce flux va pouvoir recevoir des info et les ecrire
Les streams offrent la possibilité de gerer des cas d'engorgement
cad si je prend un disque dur qui est tres rapide en lecture mais tres lent en ecriture
--> le stream de lecture va etre plus rapide que celui de l ecriture
donc le stream d ecriture ne va pas arriver a suivre
donc il faut mettre en paus la lecture , continuer a ecrire je morceau puis reprendre la lecture
il y a une methode tres pratique sur les streams qui est l utilisation du Pipe
Le pipe permet de brancher 2 streams ensemble
*** Cette methode va etre tres utile surtout lorsque on recoit des requetes assez volumineuse
pour uploader des media par example
*/