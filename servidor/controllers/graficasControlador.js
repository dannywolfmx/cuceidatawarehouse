

const directorio = "graficas";

function guardarGrafica(req, res) {
    const fs = require("fs");

    if (!req.body.file) {
        return res.status(400).send("No se encontro archivo para subir");
    }


    let archivo = req.body.file;
    let nombre = req.body.nombre


    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio)
    }

    nombre = directorio + "/" + nombre
    let nombreArchivoFinal = verificaNombreDisponible(nombre, 0)


    fs.writeFile(nombreArchivoFinal, archivo, (err) => {
        if (err) {
            res.status(400)
            console.log("Error al leer")

        } else {
            return res.status(200)
        }
    });


}

function damegrafica(req, res) {
    const file = require("fs");
    let direccion = directorio +"/" +req.headers.direccion;

    if (file.existsSync(direccion)) {
        res.status(200).send(
            file.readFileSync(direccion, "utf8")
        )
    } else {
        res.status(403).send({
            mensaje: "Archivo no disponible"
        })
    }
}

function damegraficas(req, res) {
    let listaArchivos = []
    const fs = require("fs");

    fs.readdir(directorio, (err, files) => {

        return res.status(200).send({
            archivos: files
        })
    })

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
    guardarGrafica,
    damegraficas,
    damegrafica
}