
function convertirXML(nombreArchivo, res) {

    const parser = new xml2js.Parser();

    file.readFile(nombreArchivo, (err, buffer) => {

        parser.parseString(buffer, (err, result) => {
            res.status(202).end();
            
            traductor(result).then((datos) => {
                datos = JSON.stringify(datos)
                agregaDatabase(datos)
                file.unlink(nombreArchivo)
            })

        })

    });
}

function convertirCSV(nombreArchivo, res) {
    var result = [];

    csvtojson().fromFile(nombreArchivo).on('json', (jsonObj) => {
        result.push(jsonObj)

    }).on('done', () => {

        res.status(202).end();

        traductor(result).then((datos) => {

            agregaDatabase( JSON.stringify( datos ) )
            file.unlink(nombreArchivo)

        })
    })

}

function convertirPdf(nombreArchivo, res) {

    file.readFile(nombreArchivo, function (err, buffer) {

        if (err) return console.log(err);

        pdf2table.parse(buffer, function (err, result, rowsdebug) {
            if (err) {
                return console.log(err);
            }

            res.status(202).end();

            traductor(result).then((datos) => {

                d = JSON.stringify(datos)
                agregaDatabase(d)
                file.unlink(nombreArchivo)

            })

        });
    });
}



function convertirXls(nombreArchivo, res) {

    node_xj({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.status(202).end();
            traductor(result).then(( datos ) => {
                d = 
                agregaDatabase( JSON.stringify( datos ) )
                file.unlink(nombreArchivo)
            })
        }
    });
    
}

function convertirXLSX(nombreArchivo, res) {
    xlscToJson({
        input: nombreArchivo,
        output: null
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.status(202).end();
            traductor(result).then((datos) => {
                d = JSON.stringify(datos)
                agregaDatabase(d)
                file.unlink(nombreArchivo)
            })
        }
    });
}
