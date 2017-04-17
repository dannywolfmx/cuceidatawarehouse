

const express = require('express'),
    app = express(),
    file = require("fs"),
    fileUpload = require("express-fileupload"),
    node_xj = require("xls-to-json"),
    PDFParser = require("pdf2json"),
    pdf2table = require("pdf2table"),
    csvtojson = require("csvtojson"),
    xml2js = require("xml2js"),
    xlscToJson = require("xlsx-to-json"),
    server = require('http').Server(app),
    io = require('socket.io')(server);

const config = require('./config')
const traductor = require('./utils/traductor')

const api = require("./routes")
app.io = io;

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + './public/bower_components'));

app.use('/',api);

//Fijamos el puerto de escucha
app.set('port', config.port);

server.listen(config.port, () => {
    console.log('Express corriendo en 127.0.0.1: ' + config.port);
    console.log("Express corriendo, para terminar preciona Ctrl-C");
});

function agregaDatabase(datos) {
    dataBase.push(datos);
    console.log("Emitiendo datos al cliente")
    app.io.sockets.emit('news', datos);
}

/*function traductor(elementos){

    return Promise.all(elementos.map((obj)=>{
        return  Promise.all(Object.keys(obj).map((key) =>{
                    return traduceEsp(obj[key]).then(x => {
                        obj[key] = x
                        return obj
                        }); 
        })).then(
            x => {
                return x.slice() // slice makes copy of array before sorting it
                .sort(function(a,b){
                    return a > b;
                })
                .reduce(function(a,b){
                    if (a.slice(-1)[0] !== b) a.push(b); // slice(-1)[0] means last item in array without removing it (like .pop())
                    return a;
                },[]);
            }
        )

    })).then(x =>{
        return [].concat.apply([],x);
    })
}


function traduceEsp(text){
    return translate(text, {to: 'es'}).then(res => {
        console.log(res.text)
        app.io.sockets.emit('news', res.text);
        return res.text
    }).catch(err => {
        console.error(err);
    })

}*/
