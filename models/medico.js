const { Schema, model } = require('mongoose');

const MedicoSistema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
    },
    hospitales:{
        type: Schema.Types.ObjectId,
        ref:'Hospital',
    },
    
},{
    collection: 'Medicos'
});
// Metodo para no mostrar el password
MedicoSistema.method('toJSON', function() {
    const { _v, ...object } = this.toObject();
    return object;
})
module.exports = model('Medico', MedicoSistema );