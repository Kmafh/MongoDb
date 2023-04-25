
const Usuario = require('../models/usuario')
const { response } = require('express');
const { validationResult } = require('express-validator');


const getUsuarios = async(req,res) =>{

    const usuarios = await Usuario.find()

    res.json({
        ok:true,
        usuarios
    })
}

const setUsuario = async(req,res) =>{
    const { nombre,password,email } = req.body;

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    } 

    try{

        const existEmail = await Usuario.findOne({ email });


        if( existEmail ){
            return res.status(400).json({
                ok:false,
                msg:'El email ya esta registrado'
            })
        } else {
            const usuario = new Usuario( req.body );

            await usuario.save();
            res.json({
                ok:true,
                usuario
            })
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

    
}

module.exports = {
    getUsuarios,
    setUsuario
}