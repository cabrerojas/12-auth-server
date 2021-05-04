
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcryt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { nombre, correo, contraseña } = req.body;

    try {

        // Verificar el correo

        const usuario = await Usuario.findOne({ correo });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe. ¿ Tendrás un clon malvado ?'
            });
        }

        // Crear usuario con el modelo

        const dbUser = new Usuario( req.body );

        // Hashear la contraseña
        const salt = bcryt.genSaltSync(10);
        dbUser.contraseña = bcryt.hashSync( contraseña, salt );

        // Generar el KWT
        const token = await generarJWT( dbUser.id, nombre );

        // Crear usuario de BD

        await dbUser.save();
        
        // Generar respuesta existosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre,
            token,
            msg: 'Usuario creado exitosamente'
        });
        

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

   

    return res.json({
        ok: true,
        msg: 'Crear Usuario /nuevo'
    });

};

const loginUsuario =  (req, res = response) => {

    const { correo, contraseña } = req.body;

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