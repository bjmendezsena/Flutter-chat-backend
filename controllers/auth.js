const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req = request, res = response) => {

    const { email , password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Este correo electrónico ya existe en la base de datos'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // Generar jwt

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });

    }

}


const login = async (req = request, res = response) => {

    const { email , password} = req.body;

    try {
        const usuario = await Usuario.findOne({email: email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Este correo electrónico no existe en la base de datos'
            });
        }

        // Validar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        // Generar jwt

        const token = await generarJWT(usuario.id);
        
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

}

const renewToken = async (req = request, res = response) =>{

    const uid = req.uid;

    console.log(uid)
    const usuario = await Usuario.findById(uid);

    if(usuario === null){
        
        return res.status(500).json({
            ok: false,
            msg: 'Este usuario no existe en la base de datos',
        });
    }

    const token = await generarJWT(usuario.uid);

    res.json({
        ok: true,
        usuario,
        token
    });

}

module.exports = {
    crearUsuario,
    login,
    renewToken
};