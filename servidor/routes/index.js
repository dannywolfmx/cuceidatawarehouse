'use strict'
const archivoControlador = require("../controllers/archivosController");
const authControll = require("../controllers/authController")

const auth = require("../middleware/auth")

const express = require('express');
const api = express.Router();



api.get('/', (req, res) => { res.sendFile("./index.html") })

api.post('/archivo', auth,archivoControlador.guardarArchivo)
api.post('/eliminararchivo',auth,archivoControlador.eliminarArchivo)
api.post('/damearchivo',auth,archivoControlador.dameArchivo)

//Api de usuarios
api.post("/signup",authControll.signUp)
api.post("/signin",authControll.signIn)

//api de prueba para el auth

api.post("/private",auth, (req,res)=>{
    console.log(req.body)
    res.status(200).send({
        mensaje:"Tienes acceso"
    })
})


module.exports = api