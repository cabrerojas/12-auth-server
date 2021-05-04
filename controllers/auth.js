
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

        // Generar el JWT
        const token = await generarJWT( dbUser.id, nombre, correo );

        // Crear usuario de BD

        await dbUser.save();
        
        // Generar respuesta existosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre,
            correo,
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

};

const loginUsuario =  async (req, res = response) => {

    const { correo, contraseña } = req.body;

    try {

        const dbUser = await Usuario.findOne({correo});

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña y/o correo son incorrectos'
            });
        }

        // Confirmar si contraseña ehace math
        const validPassword = bcryt.compareSync( contraseña, dbUser.contraseña );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña y/o correo son incorrectos'
            });
        }

        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre, dbUser.correo  );

        // Generar respuesta existosa
        return res.json({
            ok: true,
            uid: dbUser.id,
            correo,
            token,
            msg: 'Inicio de sesión exito'
        });


        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const revalidarToken =  async (req, res) => {

    const { uid } = req;

    //Leer base de datos
    const dbUser = await Usuario.findById(uid);

     // Generar el JWT
     const token = await generarJWT( uid, dbUser.nombre );

    return res.json({
        ok: true,
        msg: 'Renovar',
        uid,
        nombre: dbUser.nombre,
        correo: dbUser.correo,
        token
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};