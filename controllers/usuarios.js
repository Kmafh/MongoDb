
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const getUsuario = async(req,res) =>{
    const id = req.params.id
    
    try{
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

        res.json({
            ok:true,
            usuario
        })

    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}

const getUsuarios = async(req,res) =>{

    const usuarios = await Usuario.find()

    res.json({
        ok:true,
        usuarios
    })
}

const setUsuario = async(req,res) =>{
    const { password,email } = req.body;
    

    try{

        const existEmail = await Usuario.findOne({ email });


        if( existEmail ){
            return res.status(400).json({
                ok:false,
                msg:'El email ya esta registrado'
            })
        } 
            const usuario = new Usuario( req.body );
            
            //Encriptar password

            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt)
            
            await usuario.save();
            res.json({
                ok:true,
                usuario
            })
        
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

    
}

const putUsuario = async(req,res) =>{

    // Validar token y comprobar si es el usuario correcto

    const id = req.params.id
    
    try{
        const exitUserDb = await Usuario.findById(id);
        if(!exitUserDb){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        //Actualizar
        const {password,google,email, ...camp} = req.body;

        if(exitUserDb.email !== email){
            
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe el email para otro usuario'
                })
            }
        }

        camp.email = email
        const updUser = await Usuario.findByIdAndUpdate(id, camp, { new: true});
        res.json({
            ok:true,
            usuario: updUser
        });
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const deleteUsuario = async(req,res) =>{
    const id = req.params.id
    

    try{
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg:'Usuario eliminado'
        })

    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}
module.exports = {
    getUsuarios,
    setUsuario,
    putUsuario,
    deleteUsuario,
    getUsuario
}