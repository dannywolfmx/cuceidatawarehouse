'use strict'
const fileToJson = require("../utils/fileToJson");



const TIPOS_ARCHIVOS = fileToJson.TIPOS_ARCHIVOS;

function lectoraDeArchivos(req, res) {
    if (!req.files) {
        return res.status(400).send("No se encontro archivo para subir");
    }

    let archivo = req.files.file;
    let nombreArchivo = archivo.name
    let tipo = archivo.mimetype

    archivo.mv(nombreArchivo, (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        switch (tipo) {
            case TIPOS_ARCHIVOS.cvs:
                fileToJson.convertirCSV(nombreArchivo, res);
                break;
            case TIPOS_ARCHIVOS.pdf:
                fileToJson.convertirPdf(nombreArchivo, res);
                break;
            case TIPOS_ARCHIVOS.xls:
                fileToJson.convertirXls(nombreArchivo, res);
                break;
            case TIPOS_ARCHIVOS.xlsx:
                fileToJson.convertirXLSX(nombreArchivo, res);
                break;
            case TIPOS_ARCHIVOS.xml:
                fileToJson.convertirXML(nombreArchivo, res);
                break;
            default: res.send("Tipo desconocido");
        }
    })


};

module.exports ={ lectoraDeArchivos}