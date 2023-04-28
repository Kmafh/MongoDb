

const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medico')
const getResult = async(req,res) =>{
    const busqueda = req.params.busqueda || 0;
    try{
        const regex = new RegExp( busqueda, 'i');
        const [usuarios, hospital, medicos] = await Promise.all([
            Usuario.find( {nombre: regex}),
            Hospital.find( {nombre: regex}),
            Medico.find( {nombre: regex})
        ])
        res.json({
            ok:true,
            msg:"Encontrado",
            usuarios,
            hospital,
            medicos
        })
    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}
const getColUser = async(req,res) =>{
    const table = req.params.table || 0;
    const busqueda = req.params.busqueda || 0;
    try{
        let data = [];
        const regex = new RegExp( busqueda, 'i');
        switch(table) {
            case 'medicos':
                data = await Medico.find( {nombre: regex})
                .populate('usuario','nombre img')
                .populate('hospital','nombre img')
                break;
            case 'usuarios':
                data = await Usuario.find( {nombre: regex})
                    break;
            case 'hospitales':
                data = await Hospital.find( {nombre: regex})
                .populate('usuario','nombre img')

                break;
            default:
                res.status(400).json({
                    ok:false,
                    msg:'La tabla tiene que ser usuario/medicos/hospitales'
                })
                break;
        }
        res.json({
            ok:true,
            data
        })
    } catch (error){
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    
}
module.exports = {
    getResult,
    getColUser
}