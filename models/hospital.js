const { Schema, model } = require('mongoose');

const HospitalSistema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Usuario',
    },
    
},{
    collection: 'Hospitales'
});
// Metodo para no mostrar el password
HospitalSistema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
})
module.exports = model('Hospital', HospitalSistema );