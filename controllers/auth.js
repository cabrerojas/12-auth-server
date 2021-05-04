
const { response } = require('express');

const crearUsuario =  (req, res = response) => {

    
    return res.json({
        ok: true,
        msg: 'Crear Usuario /nuevo'
    });

};

const loginUsuario =  (req, res) => {

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