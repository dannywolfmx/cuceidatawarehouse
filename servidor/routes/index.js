'use strict'

const express = require('express');

const api = express.Router();


api.get('/',(req,res) => { res.sendFile("./index.html")})

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send("No se encontro archivo para subir");
    }

    console.log(req.files.file)

    let archivo = req.files.file;
    let nombreArchivo = archivo.name
    let tipo = archivo.mimetype


    //console.log(tipo)
    archivo.mv(nombreArchivo, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        if ("application/vnd.ms-excel" == tipo) {
            convertirXls(nombreArchivo, res)
        } else if ("application/pdf" == tipo) {
            convertirPdf(nombreArchivo, res)
        } else if ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" == tipo) {
            convertirXLSX(nombreArchivo, res)
        }
        else if ("text/csv" == tipo) {
            convertirCSV(nombreArchivo, res)
        } else if ("text/xml" == tipo) {
            convertirXML(nombreArchivo, res)
        } else {
            res.send("Tipo desconocido");
        }
    })
})



module.exports = api