

const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async ( uid = '' ) => {
    
    if(!uid.length > 0){
        return;
    }
    const usuario   = await Usuario.findById(uid);
    usuario.online  = true;

    await usuario.save();

    return usuario;

}
const usuarioDesconectado = async ( uid = '' ) => {
    
    if(!uid.length > 0){
        return;
    }
    const usuario   = await Usuario.findById(uid);
    usuario.online  = false;

    await usuario.save();

    return usuario;

}

const grabarMensaje = async(payload )=>{

    

    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}

