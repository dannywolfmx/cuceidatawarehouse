'use strict'
const translate = require('google-translate-api');



function traductor(elementos) {

    return Promise.all(elementos.map((obj) => {
        return Promise.all(Object.keys(obj).map((key) => {
            return traduceEsp(obj[key]).then(x => {
                obj[key] = x
                return obj
            });
        })).then(
            x => {
                return x.slice()
                    .sort(function (a, b) {
                        return a > b;
                    })
                    .reduce(function (a, b) {
                        if (a.slice(-1)[0] !== b) a.push(b);
                        return a;
                    }, []);
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