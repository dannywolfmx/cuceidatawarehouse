const express = require('express'),
    app = express(),
    fs = require("fs"),
    fileUpload = require("express-fileupload"),
    node_xj = require("xls-to-json"),
    PDFParser = require("pdf2json")
    pdf2table = require("pdf2table");

const PUERTO = 3001;

app.use(fileUpload());


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
            convertirXls(nombreArchivo)
        }else if("application/pdf" == tipo){
            console.log("Entre")
            convertirPdf(nombreArchivo)
        }

        res.send("Files uploaded!");
    })



    
})


//Fijamos el puerto de escucha
app.set('port', process.env.PORT || PUERTO);


app.get('/',(req,res) => res.send("Express esta trabajando"));

app.listen( app.get('port') , () => {
    console.log("Express corriendo en 127.0.0.1:"+PUERTO);
    console.log("Express corriendo, para terminar preciona Ctrl-C")  ;
});

function convertirPdf(nombreArchivo){
    fs.readFile(nombreArchivo, function (err, buffer) {
        if (err) return console.log(err);
    
        pdf2table.parse(buffer, function (err, rows, rowsdebug) {
            if(err) return console.log(err);
    
            console.log(rows);
        });
    });
}

function convertirXls(nombreArchivo){
    var res = {};

    node_xj({  
    input: "nombreArchivo", 
    output: "bla.json"
    }, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        console.log(result)
    }
    });
}