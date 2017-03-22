const express = require('express');
const app = express();
const PUERTO = 3000


//Fijamos el puerto de escucha
app.set('port', process.env.PORT || PUERTO);


app.get('/',(req,res) => res.send("Express esta trabajando"));

app.listen( app.get('port') , () => {
    console.log("Express corriendo en 127.0.0.1:"+PUERTO);
    console.log("Express corriendo, para terminar preciona Ctrl-C")  ;
});

