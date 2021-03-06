const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = async ( req, res = response, next ) => {
    
    const token = req.header('g-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {

        const { uid, nombre, correo } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        
        req.uid     = uid;
        req.nombre  = nombre;
        req.correo  = correo;


    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    // TODO OK
    next();
};

module.exports = {
    validarJWT
};