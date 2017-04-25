const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");

const mongoose = require("mongoose")

const config = require('./config')
const api = require("./routes")

app.io = io;


app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + './public/bower_components'));

app.use('/', api);

//Fijamos el puerto de escucha
app.set('port', config.port);

mongoose.connect('mongodb://localhost:27017/datawarehouse', (err, red) => {
    if (err) {

        console.log("Recuerda activar docker y mongodb ;)");
        console.log(err)

    } else {

        console.log("Conectado a mongodb...");

        //Ahora ponemos a la escucha nuestro servidor, una vez conectado a mongo
        server.listen(config.port, () => {
            console.log('Express corriendo en 127.0.0.1:' + config.port);
            console.log("Express corriendo, para terminar preciona Ctrl-C");
        });
    }

})





