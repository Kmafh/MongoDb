const googleVerify = require('../helpers/google-verify');
const { generateJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


const login = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {

        // verificar email
        const usuDb = await Usuario.findOne({ email });

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
        const token = await generateJWT( usuDb.id )

        res.json({
            ok: true,
            token
        });
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        });
    }
}
const googleSingIn = async ( req, res = response ) => {
    try {
        const { email, name, picture } = await googleVerify( req.body.token );
        
        const usuarioDb = await Usuario.findOne({ email });
        console.log({usuarioDb})
        let usuario;

        if (!usuarioDb) {
            usuario = new Usuario({
                email,
                nombre: name,
                password:'@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDb;
            usuario.google = true;
        }

        await usuario.save();
        
        //Generar token 
        const token = await generateJWT( usuario.id )

        res.json({
            ok: true,
            msg: email, name, picture,
            token
        });
    } catch (error){
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        });
    }
}


const renewToken = async(req, res = response) => {

    const uid = req.id;
    //Generar token 
    const token = await generateJWT( uid )

    res.json({
        ok:true,
        token
    })
}
module.exports = {
    login,
    googleSingIn,
    renewToken
}