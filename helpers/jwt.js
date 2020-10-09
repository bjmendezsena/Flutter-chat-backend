const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {


    return new Promise((resolve, rejected) => {
        
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                rejected('Error al tratar de generar el token')
            } else {
                resolve(token);
            }
        });

    });


}


module.exports = {
    generarJWT
}