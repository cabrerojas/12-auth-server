const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

// Crear un nuevo usuario
router.post( '/nuevo', crearUsuario );

// Login de usuario
router.post( '/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña debe ser de 6 caracteres o mayor').isLength(6),

], loginUsuario );

// Validar y revalidar token
router.get( '/renovar', revalidarToken );


module.exports = router;