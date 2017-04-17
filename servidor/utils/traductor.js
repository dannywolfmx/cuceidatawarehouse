'use strict'
const googleApiKey = "AIzaSyDliy81BhaEAiDqeETyV1cA2zY9dJVol44";
const translate = require('google-translate-api');



function googleTranslate(idiomaEntrada, idiomaSalida, texto) {

        translate(texto, {to: 'es'},function(res,err){
            console.log(res)
        })

    

}


module.exports = {
    googleTranslate
}