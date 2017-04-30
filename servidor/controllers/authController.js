'use strict'

const mongoose = require("mongoose");
const Usuario = require("../models/usuario")
const service  =require("../service")

function signUp(req,res){
    const usuario = new Usuario({
        correo:req.body.correo,
        nombre:req.body.nombre,
        password:req.body.password,
        rol:req.body.rol
    })
    console.log(req.body.rol)

    usuario.save((err)=>{
        if(err){
            res.status(500).send({
                mensaje:"Error al crear el usuario"
            })
        }else{
            return res.status(200).send({
                token:service.createToken(usuario),
                usuario:usuario
            })
        }
    })
}

function signIn(req,res){
    let password = req.body.password
    Usuario.findOne({
        correo:req.body.correo
    }, (err,usuario) =>{
        if(err){
            return res.status(500).send({
                mensaje:err
            })
        }else if(!usuario){
            return res.status(404).send({
                mensaje:"No existe el usuario"
            })
        }else{
            usuario.comparePassword(password,function(err,isMatch){
                if(isMatch && isMatch == true){
                    req.usuario = usuario;
                    res.status(200).send({
                        mensaje:"Te has logueado correctamente",
                        usuario:usuario,
                        token:service.createToken(usuario)
                    })
                }else{
                    return res.status(401).send({
                        mensaje:"Error en la password"
                    })
                }
            })

        }
    })
}

module.exports = {
    signUp,
    signIn
}