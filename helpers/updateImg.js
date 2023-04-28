
const fs = require('fs')

const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medico')

const updateImg = async(table, id, newNameFile) =>{
    switch( table ){
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            addImg(usuario, 'usuarios',newNameFile)
            return true;
            break;
        case 'medicos':
            const medicos = await Medico.findById(id);
            if(!medicos){
                return false;
            }
            addImg(medicos, 'medicos',newNameFile)
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }
            addImg(hospital, 'hospitales',newNameFile)
            return true;
            break;
    }
}

const addImg = async( data, table, newNameFile) => {
    const pathOld = `./upload/${table}/${data.img}`;
    if(fs.existsSync(pathOld)){
       fs.unlinkSync(pathOld);
    }
    data.img = newNameFile;
    await data.save();
}
module.exports = {
    updateImg
}