'use strict'
const archivoControlador = require("../controllers/archivosController");
const authControll = require("../controllers/authController")

const auth = require("../middleware/auth")

const express = require('express');
const api = express.Router();



api.get('/', (req, res) => { res.sendFile("./index.html") })

api.post('/upload', archivoControlador.lectoraDeArchivos)

//Api de usuarios
api.post("/signup",authControll.signUp)
api.post("/signin",authControll.signIn)

//api de prueba para el auth

api.get("/private",auth, (req,res)=>{
    res.status(200).send({
        mensaje:"Tienes acceso"
    })
})


module.exports = api