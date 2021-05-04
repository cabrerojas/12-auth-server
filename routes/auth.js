
const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

// Crear un nuevo usuario
router.post( '/nuevo', crearUsuario );

// Login de usuario
router.post( '/', loginUsuario );

// Validar y revalidar token
router.get( '/renovar', revalidarToken );


module.exports = router;