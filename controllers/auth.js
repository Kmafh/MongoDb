const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const login = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {

        // verificar email
        const usuDb = await Usuario.findOne({email});

        if(!usuDb) {
            return res.status(404).json({
                ok:false,
                msg: 'Login fail. Email o Pass erroneos'
            })
        }
        // Verificar pass

        const validPass =  bcrypt.compareSync(password, usuDb.password);

        if(!validPass){
            return res.status(400).json({
                ok:false,
                msg: 'Login fail. Email o Pass erroneos'
            })
        }

        //Generar token 
        
        res.json({
            ok: true,
            msg: 'Correcto'
        });
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        });
    }
}

module.exports = {
    login
}