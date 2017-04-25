'use strict'

const service = require("../service")


function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            mensaje: "No tienes autorizacion"
        })
    } else {
        const token = req.headers.authorization.split(" ")[1]// El segundo elemento del array
                console.log("Decodificando")
        service.decodeToken(token).then(
            response => {
                console.log("Decodificado")
                
                
                req.usuario = response
                next()
            }
        ).catch(response => {
            console.log("Holas")
            res.status(response.status).send({
                mensaje:response.mensaje
            })

        })

    }
}


module.exports = isAuth