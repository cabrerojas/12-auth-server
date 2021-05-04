
const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario =  (req, res = response) => {

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { nombre, correo, contraseña } = req.body;
    
    console.log(nombre, correo, contraseña);


    return res.json({
        ok: true,
        msg: 'Crear Usuario /nuevo'
    });

};

const loginUsuario =  (req, res = response) => {

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { correo, contraseña } = req.body;
    
    console.log(correo, contraseña);

    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });

};

const revalidarToken =  (req, res) => {

    return res.json({
        ok: true,
        msg: 'Renovar'
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};