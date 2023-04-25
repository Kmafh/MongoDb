const { Schema, model } = require('mongose');

const HospitalSistema = Schema({

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
});

module.exports = model('Hospital', HospitalSistema );