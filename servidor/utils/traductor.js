'use strict'
const translate = require('google-translate-api');



function traductor(elementos) {

    return Promise.all(elementos.map((obj,i) => {
        return Promise.all(Object.keys(obj).map((key) => {
            //Para eliminar el elemento [1] que se repite tras la traduccion aplicamos un filtro
                return traduceEsp(obj[key]).then(x => {
                    obj[key] = x
                    console.log(obj)
                    return obj
                });
            
        })).then(
                x => {
                    return x.filter(
                        (x, key) => {
                            if (key == 0) {
                                return x;
                            }
                        }
                    )
                //Funcion anterior, menos eficiente pero funciona
                /*                x.slice()
                                    .sort(function (a, b) {
                                        return a > b;
                                    })
                                    .reduce(function (a, b) {
                                        if (a.slice(-1)[0] !== b) a.push(b);
                                        return a;
                                    }, []);*/
            }
            )

    })).then(x => {
        return [].concat.apply([], x);
    })

}


function traduceEsp(text) {
    return translate(text, { to: 'es' }).then(res => {
        return res.text
    }).catch(err => {
        console.error(err);
    })

}

module.exports = traductor