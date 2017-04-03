const express = require('express'),
    app = express(),
    file = require("fs"),
    fileUpload = require("express-fileupload"),
    node_xj = require("xls-to-json"),
    PDFParser = require("pdf2json")
    pdf2table = require("pdf2table"),
    csvtojson = require("csvtojson"),
    xml2js = require("xml2js"),
    xlscToJson = require("xlsx-to-json");

const PUERTO = 3001;

app.use(fileUpload());

app.use(express.static(__dirname + '/views'));


app.post('/upload',(req,res) =>{
    if(!req.files){
        return res.status(400).send("No files were uploaded");
    }

    let archivo = req.files.sampleFile;
    let nombreArchivo = archivo.name
    let tipo = archivo.mimetype
    console.log(tipo)
    archivo.mv(nombreArchivo,(err)=>{
        if(err){
            return res.status(500).send(err)
        }
        
        if("application/vnd.ms-excel" == tipo){
            convertirXls(nombreArchivo,res)
        }else if("application/pdf" == tipo){

            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            convertirPdf(nombreArchivo,res)
        }else if("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" == tipo){
            convertirXLSX(nombreArchivo,res)
        }
        else if("text/csv" == tipo){
            convertirCSV(nombreArchivo,res)
        }else if("text/xml" == tipo){
            convertirXML(nombreArchivo,res)
        }else{
            res.send("Tipo desconocido");
        }

    })



    
})


//Fijamos el puerto de escucha
app.set('port', process.env.PORT || PUERTO);


app.get('/',(req,res) => {
    res.sendFile("./index.html")
})

app.listen( app.get('port') , () => {
    console.log("Express corriendo en 127.0.0.1:"+PUERTO);
    console.log("Express corriendo, para terminar preciona Ctrl-C")  ;
});

function convertirXML(nombreArchivo,res){

    const parser = new xml2js.Parser();

    file.readFile(nombreArchivo, function (err, buffer) {
        parser.parseString(buffer,(err,result) =>{
            res.send(JSON.stringify(result))
        })
    });

    file.unlink(nombreArchivo)

}

function convertirCSV(nombreArchivo,res){
    var coleccion = []
    csvtojson().fromFile(nombreArchivo).on('json',(jsonObj)=>{
        coleccion.push(jsonObj)
    }).on('done',() =>{
        res.send(JSON.stringify(coleccion))
        file.unlink(nombreArchivo)
    })

}

function convertirPdf(nombreArchivo,res){
    file.readFile(nombreArchivo, function (err, buffer) {
        if (err) return console.log(err);
    
        pdf2table.parse(buffer, function (err, rows, rowsdebug) {
            if(err){
             return console.log(err);
            }
             res.send(JSON.stringify(rows))   
            console.log(rows);
             file.unlink(nombreArchivo)
        });
    });
}

function convertirXls(nombreArchivo,res){
    node_xj({  
    input: nombreArchivo,
    output:null
    }, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        console.log(result)
        res.send(JSON.stringify(result))   
        file.unlink(nombreArchivo)
    }
    });
}

function convertirXLSX(nombreArchivo,res){
    xlscToJson({  
    input: nombreArchivo,
    output:null
    }, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        console.log(result)
        res.send(JSON.stringify(result))   
        file.unlink(nombreArchivo)
    }
    });
}