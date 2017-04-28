'use strict'

const traductor = require("../utils/traductor");
const file = require("fs")


function traductorJSON(req, res) {
    let direccion = req.headers.nombrearchivo;
    console.log(direccion)
    if (!file.existsSync(direccion)) {
        return res.status(500).send({
            mensaje: "No existe el archivo"
        })
    } else {

        file.readFile(direccion, 'utf8', function (err, texto) {
            texto = JSON.parse(texto)
            for (var a in texto) {
                console.log(texto[a]);
            }
            if (!texto) {
                console.log("El texto a traducir no contiene nada");
                return res.status(400).send("No se encontro nombre del archivo");
            }

            traductor(texto).then((datos) => {
                res.status(200).send(
                    //JSON.stringify(datos)
                    datos
                )
            }).catch(err => {
                res.status(500).end({
                    mensaje: "Error al traducir"

                })
            })
        })


    }



}



module.exports = {
    traductorJSON
}