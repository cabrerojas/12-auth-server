
const { Router } = require('express');

const router = Router();

// Crear un nuevo usuario
router.post( '/nuevo',  (req, res) => {

    return res.json({
        ok: true,
        msg: 'Crear Usuario /nuevo'
    });

});

// Login de usuario
router.post( '/',  (req, res) => {

    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });

});

// Validar y revalidar token
router.get( '/renovar',  (req, res) => {

    return res.json({
        ok: true,
        msg: 'Renovar'
    });

});







module.exports = router;