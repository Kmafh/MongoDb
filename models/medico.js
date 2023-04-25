const { Schema, model } = require('mongose');

const MedicoSistema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    Usuario:{
        type: Number,
        required: true,
    },
    Hospital:{
        type: Number,
        required: true,
    },
});

module.exports = model('Medico', MedicoSistema );