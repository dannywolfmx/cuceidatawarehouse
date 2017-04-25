'use strict'

const service = require("../service")


function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            mensaje: "No tienes autorizacion"
        })
    } else {
        const token = req.headers.authorization.split(" ")[1]// El segundo elemento del array
        service.decodeToken(token).then(
            response => {
                req.usuario = response
                next()
            }
        ).catch(response => {
            res.status(response.status).send({
                mensaje: response.mensaje
            })

        })

    }
}


module.exports = isAuth