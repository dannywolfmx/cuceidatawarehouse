'use strict'

const Usuario = require("../models/usuario")


function guardarUsuario(req, res) {
    let usuario = new Usuario();
    console.log(req.body)
    usuario.correo = req.body.correo;
    usuario.password = req.body.password;

    usuario.save((err, usuarioAlmacenado) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al salvar en la base de datos"
            })
        } else {
            res.status(200).send({
                usuario: usuarioAlmacenado
            })
        }
    })
}

function dameUsuario(req, res) {
    let usuarioId = req.params.usuarioId;

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) {
            return res.status(500).send({
                mensaje: "Error al realizar peticion"
            })
        }
        if (!usuarios) {
            return res.status(400).send({
                mensaje: "No existen usuarios"
            })
        }
        res.send(200, {
            usuario
        })
    })
}

function dameUsuarios(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).send({
                mensaje: "Error al realizar peticion"
            })
        }
        if (!usuarios) {
            return res.status(400).send({
                mensaje: "No existen usuarios"
            })
        }
        res.send(200, {
            usuarios
        })
    })
}

function actualizarUsuario(req, res) {
    let usuarioId = req.params.usuarioId;
    let update = req.body

    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioActualizado) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al actulizar el producto:" + err
            })
        } else {
            res.status(200).send({
                usuario: usuarioActualizado
            })
        }

    })
}

function eliminarUsuario(req, res) {
    let usuarioId = req.params.usuarioId;

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) {
            return res.status(500).send({
                mensaje: "Error al realizar peticion"
            })
        }
        usuario.remove(err => {
            if (err) {
                res.status(500).send({
                    mensaje: "Error al borrar el usuario" + err
                })
            }else{
                res.status(200).send({
                    mensaje:"El usuario ha sido eliminado"
                })
            }
        })
    })
}

module.exports = {
    dameUsuarios,
    dameUsuario,
    actualizarUsuario,
    eliminarUsuario,
    guardarUsuario
}


