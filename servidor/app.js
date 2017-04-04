const express = require('express'),
    app = express(),
    file = require("fs"),
    fileUpload = require    ( "express-fileupload" ),
    node_xj     = require   (   "xls-to-json"   ),
    PDFParser   = require   (   "pdf2json"      )
    pdf2table   = require   (   "pdf2table"     ),
    csvtojson   = require   (   "csvtojson"     ),
    xml2js      = require   (   "xml2js"        ),
    xlscToJson  = require   (   "xlsx-to-json"  );

const dataBase = []

const PUERTO = 3001;

app.use(fileUpload());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + './public/bower_components'));

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:3001', 'http://danielmenchaca:3001'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});


app.post('/upload',(req,res) =>{
    if(!req.files){
        return res.status(400).send("No se encontro archivo para subir");
    }

    console.log(req.files.file)

    let archivo = req.files.file;
    let nombreArchivo = archivo.name
    let tipo = archivo.mimetype
    
    
    //console.log(tipo)
    archivo.mv(nombreArchivo,(err)=>{
        if(err){ 
            console.log(err)
            return res.status(500).send(err) 
        }
        
        if("application/vnd.ms-excel" == tipo){
            convertirXls(nombreArchivo,res)
        }else if("application/pdf" == tipo){
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

app.get('/array',(req,res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(dataBase[0])
})

app.listen( app.get('port') , () => {
    console.log("Express corriendo en 127.0.0.1:"+PUERTO);
    console.log("Express corriendo, para terminar preciona Ctrl-C")  ;
});

function convertirXML(nombreArchivo,res){

    const parser = new xml2js.Parser();

    file.readFile(nombreArchivo, function (err, buffer) {
        parser.parseString(buffer,(err,result) =>{
            datos = JSON.stringify(result)
            res.send(datos)   
            agregaDatabase(datos)
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
        datos = JSON.stringify(coleccion)
        res.send(datos)   
        agregaDatabase(datos)
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
             datos = JSON.stringify(rows)
             res.send(datos)   
             agregaDatabase(datos)
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
        datos = JSON.stringify(result);
        res.send(datos)   
        agregaDatabase(datos)
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
        datos = JSON.stringify(result);
        res.send(datos)   
        agregaDatabase(datos)
        file.unlink(nombreArchivo)
    }
    });
}


function agregaDatabase(datos){
    dataBase.push(datos);
    console.log(dataBase[0])
}