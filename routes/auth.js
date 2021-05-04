const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { valirCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear un nuevo usuario
router.post( '/nuevo', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña debe ser de 6 caracteres o mayor').isLength(6),
    valirCampos

], crearUsuario );

// Login de usuario
router.post( '/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña debe ser de 6 caracteres o mayor').isLength(6),
    valirCampos

], loginUsuario );

// Validar y revalidar token
router.get( '/renovar', [
    validarJWT
] ,revalidarToken );


module.exports = router;