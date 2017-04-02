const express = require('express'),
    app = express(),
    fileUpload = require("express-fileupload");


const PUERTO = 3000;

app.use(fileUpload());


app.post('/upload',(req,res) =>{
    if(!req.files){
        return res.status(400).send("No files were uploaded");
    }

    let archivo = req.files.sampleFile;
    let nombreArchivo = archivo.name
    archivo.mv(nombreArchivo,(err)=>{
        if(err){
            return res.status(500).send(err)
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

