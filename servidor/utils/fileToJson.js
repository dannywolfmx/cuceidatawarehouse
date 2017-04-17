'use strict'
const TIPOS_ARCHIVOS = {
    csv: "text/csv",
    pdf:"application/pdf",
    xls:"application/vnd.ms-excel",
    xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml: "text/xml"
}

const traductor = require("./traductor");

function agregaDatabase(datos) {
    //dataBase.push(datos);
    console.log(datos)
    //app.io.sockets.emit('news', datos);
}


function convertirXML(nombreArchivo, res) {
    const file = require("fs");
    const xml2js = require("xml2js");

    const parser = new xml2js.Parser();

    file.readFile(nombreArchivo, (err, buffer) => {

        parser.parseString(buffer, (err, result) => {

            res.status(202).end();
            
            traductor(result).then((datos) => {

                agregaDatabase(JSON.stringify(datos))
                file.unlink(nombreArchivo)

            })

        })

    });
}

function convertirCSV(nombreArchivo, res) {
    const csvtojson = require("csvtojson");
    const file = require("fs");

    var result = [];

    csvtojson().fromFile(nombreArchivo).on('json', (jsonObj) => {
        result.push(jsonObj)

    }).on('done', () => {

        res.status(202).end();

        traductor(result).then((datos) => {

            agregaDatabase(JSON.stringify(datos))
            file.unlink(nombreArchivo)

        })
    })

}

function convertirPdf(nombreArchivo, res) {
    const pdf2table = require("pdf2table");
    const file = require("fs");

    file.readFile(nombreArchivo, function (err, buffer) {

        if (err) return console.log(err);

        pdf2table.parse(buffer, function (err, result, rowsdebug) {
            if (err) {
                return console.log(err);
            }

            res.status(202).end();

            traductor(result).then((datos) => {
                agregaDatabase(JSON.stringify(datos))
                file.unlink(nombreArchivo)

            })

        });
    });
}



function convertirXls(nombreArchivo, res) {
    const node_xj = require("xls-to-json");
    const file = require("fs");

    node_xj({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.status(202).end();
            traductor(result).then((datos) => {
                agregaDatabase(JSON.stringify(datos))
                file.unlink(nombreArchivo)
            })
        }
    });

}

function convertirXLSX(nombreArchivo, res) {

    const xlscToJson = require("xlsx-to-json");
    const file = require("fs");

    xlscToJson({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.status(202).end();
            traductor(result).then((datos) => {
                agregaDatabase(JSON.stringify(datos))
                //Eliminar el ultimo archivo
                file.unlink(nombreArchivo)
            })
        }
    });
}

module.exports = {
    TIPOS_ARCHIVOS,
    convertirXML,
    convertirCSV,
    convertirPdf,
    convertirXls,
    convertirXLSX
}