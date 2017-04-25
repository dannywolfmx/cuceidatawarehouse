'use strict'

const jwt = require("jwt-simple");
const moment = require("moment");

const config = require("../config")

function createToken(usuario) {
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    mensaje: "El tocken a expirado"
                })
            } else {
                resolve(payload.sub);
            }

        } catch (err) {
            
            reject({
                status: 500,
                mensaje: "Token invalido"
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}