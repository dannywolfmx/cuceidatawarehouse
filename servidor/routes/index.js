'use strict'
const prueba = require("../controllers/archivosController");


const express = require('express');
const api = express.Router();



api.get('/',(req,res) => { res.sendFile("./index.html")})

api.post('/upload', prueba.lectoraDeArchivos)



module.exports = api