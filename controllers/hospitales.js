
const Hospital = require('../models/hospital')
const bcrypt = require('bcryptjs')

const { response } = require('express')

const getHospital = async(req,res) =>{
    const id = req.params.id
    
    try{
        const hospital = await Hospital.findById(id)
        .populate('usuario','nombre');
        if(!hospital){
            return res.status(400).json({
                ok:false,
                msg:'El hospital no existe'
            })
        }

        res.json({
            ok:true,
            hospital
        })

    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}

const getHospitals = async(req,res) =>{

    const hospitales = await Hospital.find()

    res.json({
        ok:true,
        hospitales
    })
}

const setHospital = async(req,res) =>{
    const id = req.id;
    const { nombre } = req.body;
    const hospital = new Hospital({
        usuario:id,
        ...req.body});
    try{
        const existHospital = await Hospital.findOne({ nombre });
        if( existHospital ){
            return res.status(400).json({
                ok:false,
                msg:'El hospital ya esta registrado'
            })
        } 
           // const hospital = new Hospital( req.body );
            await hospital.save();
            res.json({
                ok:true,
                hospital
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const putHospital = async(req,res) =>{

    // Validar token y comprobar si es el hospital correcto
    const id = req.params.id
    try{
        const exitUserDb = await Hospital.findById(id);
        if(!exitUserDb){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un hospital por ese id'
            });
        }
        //Actualizar
        const {password,google,email, ...camp} = req.body;
        if(exitUserDb.email !== email){
            const existeEmail = await Hospital.findOne({ email });
            if (existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe el email para otro hospital'
                })
            }
        }
        camp.email = email
        const updUser = await Hospital.findByIdAndUpdate(id, camp, { new: true});
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

const deleteHospital = async(req,res) =>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(400).json({
                ok:false,
                msg:'El hospital no existe'
            })
        }
        await Hospital.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg:'Hospital eliminado'
        })
    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}


module.exports = {
    getHospitals,
    setHospital,
    putHospital,
    deleteHospital,
    getHospital
}