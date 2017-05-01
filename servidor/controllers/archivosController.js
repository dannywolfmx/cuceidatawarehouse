'use strict'
const fileToJson = require("../utils/fileToJson");
const traductor = require("../utils/traductor");
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");

const fs = require("fs")

const TIPOS_ARCHIVOS = fileToJson.TIPOS_ARCHIVOS;

function guardarArchivo(req, res) {
    if (!req.files) {
        return res.status(400).send("No se encontro archivo para subir");
    }
    let archivo = req.files.file;
    let correoUsuario = req.headers.correousuario;
    let directorio = "upload/" + correoUsuario;

    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio)
    }

    let nombreArchivo = directorio + "/" + archivo.name
    let tipo = archivo.mimetype

    let archivoFinal = ""

    archivo.mv(nombreArchivo, (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        switch (tipo) {
            case TIPOS_ARCHIVOS.csv:
                archivoFinal = fileToJson.convertirCSV(nombreArchivo, res);

                break;
            case TIPOS_ARCHIVOS.pdf:
                archivoFinal = fileToJson.convertirPdf(nombreArchivo, res);

                break;
            case TIPOS_ARCHIVOS.xls:
                archivoFinal = fileToJson.convertirXls(nombreArchivo, res);

                break;
            case TIPOS_ARCHIVOS.xlsx:
                archivoFinal = fileToJson.convertirXLSX(nombreArchivo, res);

                break;
            case TIPOS_ARCHIVOS.xml:
                archivoFinal = fileToJson.convertirXML(nombreArchivo, res);
                break;
            default:{
                console.log("Tipo desconocido")
              res.send("Tipo desconocido");  
            } 
        }
        if (archivoFinal !== "") {
            guardarArchivoDeUsuario(archivoFinal, correoUsuario, res)
        }
    })
};


function guardarArchivoDeUsuario(nombreArchivo, correo, res) {
    let usuario = new Usuario();

    Usuario.findOneAndUpdate({ correo: correo }, { $push: { "archivos": { direccion: nombreArchivo } } }, { new: true }, (err, usuarioActualizado) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al actulizar el producto:" + err
            })
        } else {

            res.status(200).send({
                usuario: usuarioActualizado

            }
            );

        }
    })
}

function eliminarArchivo(req, res) {
    const file = require("fs");
    let idUsuario = req.headers.idusuario;
    let idArchivo = req.headers.idarchivo;
    let direccion = req.headers.direccion;

    let usuario = new Usuario();

    Usuario.findByIdAndUpdate(idUsuario, { $pull: { "archivos": { _id: idArchivo } } }, { new: true }, (err, usuarioActualizado) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al actulizar el producto:" + err
            })
        } else {
            res.status(200).send({
                usuario: usuarioActualizado
            });

            if (file.existsSync(direccion)) {

                file.unlink(direccion)
            }

        }
    })
}

function dameArchivo(req, res) {
    const file = require("fs");
    let direccion = req.headers.direccion;
    console.log(direccion)
    if (file.existsSync(direccion)) {
        res.status(200).send(
           file.readFileSync(direccion, "utf8")
        )
    }else{
        res.status(403).send({
            mensaje:"Archivo no disponible"
        })   
    }
}

function traduccionArchivo(req, res) {
    if (!req.nombrearchivo) {
        return res.status(400).send("No se encontro nombre del archivo");
    }

    traductor(result).then((datos) => {
        agregaDatabase(JSON.stringify(datos))
        file.unlink(nombreArchivo)
    })
}

module.exports = {
    guardarArchivo,
    eliminarArchivo,
    traduccionArchivo,
    dameArchivo
}