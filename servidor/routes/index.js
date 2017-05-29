'use strict'
const archivoControlador = require("../controllers/archivosController");
const traductorControlador = require("../controllers/traductorController");
const graficaControlador = require("../controllers/graficasControlador");
const authControll = require("../controllers/authController");

const auth = require("../middleware/auth")

const express = require('express');
const api = express.Router();



api.get('/', (req, res) => { res.sendFile("./index.html") })

api.post('/archivo', auth,archivoControlador.guardarArchivo)
api.post('/eliminararchivo',auth,archivoControlador.eliminarArchivo)
api.post('/damearchivo',auth,archivoControlador.dameArchivo)
api.post('/guardargrafica',auth,graficaControlador.guardarGrafica)
api.post('/damegraficas',auth,graficaControlador.damegraficas)
api.post('/damegrafica',auth,graficaControlador.damegrafica)

api.post('/traductorjson',auth,traductorControlador.traductorJSON)

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