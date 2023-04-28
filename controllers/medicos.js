
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
const bcrypt = require('bcryptjs')

const getMedico = async(req,res) =>{
    const id = req.params.id
    
    try{
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(400).json({
                ok:false,
                msg:'El medico no existe'
            })
        }

        res.json({
            ok:true,
            medico
        })

    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}

const getMedicos = async(req,res) =>{

    const medicos = await Medico.find()

    res.json({
        ok:true,
        medicos
    })
}

const setMedico = async(req,res) =>{
    const id = req.id;
    const { nombre, hospitales} = req.body;
    const medico = new Medico({
        usuario:id,
        ...req.body});
    try{
        const existMed = await Medico.findOne({ nombre });
        if( existMed ){
            return res.status(400).json({
                ok:false,
                msg:'El médico ya esta registrado'
            })
        } 
        // const notExistHospital = await Hospital.findOne({ hospitales });
        // console.log("Hosptales: "+hospitales)
        // console.log("notExistHospital: "+notExistHospital)
        // if( !notExistHospital ){
        //     return res.status(400).json({
        //         ok:false,
        //         msg:'El hospital no existe'
        //     })
        // } 
            await medico.save();
            res.json({
                ok:true,
                medico
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const putMedico = async(req,res) =>{

    const id = req.params.id
    try{
        const exitUserDb = await Medico.findById(id);
        if(!exitUserDb){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un hospital por ese id'
            });
        }
        //Actualizar
        const  nombre  = req.body;
        
        const updUser = await Medico.findByIdAndUpdate(id, nombre, { new: true});
        res.json({
            ok:true,
            hospital: updUser
        });
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const deleteMedico = async(req,res) =>{
    const id = req.params.id
    

    try{
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(400).json({
                ok:false,
                msg:'El medico no existe'
            })
        }
        await Medico.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg:'Medico eliminado'
        })

    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}
module.exports = {
    getMedicos,
    setMedico,
    putMedico,
    deleteMedico,
    getMedico
}