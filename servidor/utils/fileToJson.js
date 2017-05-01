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

/*Algunas XML no proporcionan la tabla como nodo padre, por esto debemos verificar
que eliminemos los nodo padre inecesarios*/

function extraerTablaJson(datos) {
    if (datos === null) {
        //Datos no contiene nada
        return null;
    } else if (Array.isArray(datos)) {
        //Si es un array no se necesita tratar
        return datos;
    } else {
        //Es necesario un for para extraer la Key que es desconocida para nosotros
        for (var a in datos) {
            return extraerTablaJson(datos[a]);
        }
    }
}



function convertirXML(nombreArchivo) {
    const file = require("fs");
    const xml2js = require("xml2js");
    const parser = new xml2js.Parser();
    let nombreArchivoFinal = verificaNombreDisponible(nombreArchivo, 0)

    file.readFile(nombreArchivo, (err, buffer) => {

        parser.parseString(buffer, (err, result) => {
            result = extraerTablaJson(result)
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
    var result = [];
    let nombreArchivoFinal = verificaNombreDisponible(nombreArchivo, 0)

    csvtojson().fromFile(nombreArchivo).on('json', (jsonObj) => {
        result.push(jsonObj)

    }).on('done', () => {
        result = extraerTablaJson(result)
        file.writeFile(nombreArchivoFinal, JSON.stringify(result), (err) => {
            if (err) {
                console.log(err);
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
    let nombreArchivoFinal = verificaNombreDisponible(nombreArchivo, 0)
    file.readFile(nombreArchivo, function (err, buffer) {

        if (err) return console.log(err);
        result = extraerTablaJson(result)
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
    let nombreArchivoFinal = verificaNombreDisponible(nombreArchivo, 0)

    node_xj({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            result = extraerTablaJson(result)
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


    let nombreArchivoFinal = verificaNombreDisponible(nombreArchivo, 0)

    xlscToJson({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            result = extraerTablaJson(result)
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


function verificaNombreDisponible(nombre, intento) {
    const file = require("fs");
    let nom = nombre;
    if (intento > 0) {
        nom = nombre + "(" + intento + ")"
    }

    if (fileExists(nom + ".json")) {
        return verificaNombreDisponible(nombre, intento + 1)
    }

    if (intento > 0) {
        nombre = nombre + "(" + intento + ")"
    }
    return nombre + ".json"
}

function fileExists(filePath) {
    const file = require("fs");
    try {
        return file.statSync(filePath).isFile();
    }
    catch (err) {

        return false;
    }
}

module.exports = {
    TIPOS_ARCHIVOS,
    convertirXML,
    convertirCSV,
    convertirPdf,
    convertirXls,
    convertirXLSX
}