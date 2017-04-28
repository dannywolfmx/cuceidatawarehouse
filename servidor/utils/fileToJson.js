'use strict'
const TIPOS_ARCHIVOS = {
    csv: "text/csv",
    pdf: "application/pdf",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml: "text/xml"
}

const traductor = require("./traductor");

function agregaDatabase(datos) {
    //dataBase.push(datos);

    //app.io.sockets.emit('news', datos);
}


function convertirXML(nombreArchivo) {
    const file = require("fs");
    const xml2js = require("xml2js");
    const nombreArchivoFinal = nombreArchivo + ".json"
    const parser = new xml2js.Parser();

    file.readFile(nombreArchivo, (err, buffer) => {

        parser.parseString(buffer, (err, result) => {

            file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                } else {
                    file.unlink(nombreArchivo)
                }
            });

        })

    });
    return nombreArchivoFinal
}

function convertirCSV(nombreArchivo) {
    const csvtojson = require("csvtojson");
    const file = require("fs");
    const nombreArchivoFinal = nombreArchivo + ".json"
    var result = [];

    csvtojson().fromFile(nombreArchivo).on('json', (jsonObj) => {
        result.push(jsonObj)

    }).on('done', () => {

        file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
            if (err) {
                throw err;
            } else {
                file.unlink(nombreArchivo)
            }
        });
    })
    return nombreArchivoFinal
}

function convertirPdf(nombreArchivo) {
    const pdf2table = require("pdf2table");
    const file = require("fs");
    const nombreArchivoFinal = nombreArchivo + ".json"
    file.readFile(nombreArchivo, function (err, buffer) {

        if (err) return console.log(err);

        pdf2table.parse(buffer, function (err, result, rowsdebug) {
            if (err) {
                return console.log(err);
            }
            file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                } else {
                    file.unlink(nombreArchivo)
                }
            });
        });
    });

    return nombreArchivoFinal
}



function convertirXls(nombreArchivo) {
    const node_xj = require("xls-to-json");
    const file = require("fs");
    const nombreArchivoFinal = nombreArchivo + ".json"
    node_xj({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                } else {
                    file.unlink(nombreArchivo)
                }
            });
        }
    });

    return nombreArchivoFinal

}

function convertirXLSX(nombreArchivo) {

    const xlscToJson = require("xlsx-to-json");
    const file = require("fs");

    const nombreArchivoFinal = nombreArchivo + ".json"

    xlscToJson({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                } else {

                    file.unlink(nombreArchivo)
                }
            });
        }
    });

    return nombreArchivoFinal

}

module.exports = {
    TIPOS_ARCHIVOS,
    convertirXML,
    convertirCSV,
    convertirPdf,
    convertirXls,
    convertirXLSX
}