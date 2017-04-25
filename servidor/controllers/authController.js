'use strict'

const mongoose = require("mongoose");
const Usuario = require("../models/usuario")
const service  =require("../service")

function signUp(req,res){
    const usuario = new Usuario({
        correo:req.body.correo,
        nombre:req.body.nombre
    })

    usuario.save((err)=>{
        if(err){
            res.status(500).send({
                mensaje:"Error al crear el usuario"
            })
        }else{
            return res.status(200).send({
                token:service.createToken(usuario)
            })
        }
    })
}

function signIn(req,res){
    Usuario.find({
        email:req.body.email
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
            req.usuario = usuario;
            res.status(200).send({
                mensaje:"Te has logueado correctamente",
                token:service.createToken(usuario)
            })
        }
    })
}

module.exports = {
    signUp,
    signIn
}