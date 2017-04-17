const express = require('express'),
    app = express(),
    fileUpload = require("express-fileupload"),
    server = require('http').Server(app),
    io = require('socket.io')(server);

const config = require('./config')
const api = require("./routes")

app.io = io;

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + './public/bower_components'));

app.use('/',api);

//Fijamos el puerto de escucha
app.set('port', config.port);

server.listen(config.port, () => {
    console.log('Express corriendo en 127.0.0.1:' + config.port);
    console.log("Express corriendo, para terminar preciona Ctrl-C");
});



