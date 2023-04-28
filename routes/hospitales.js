/*
    RUTA: /api/hospitales
*/ 


const { Router } = require('express');
const { getHospital, getHospitals, setHospital, putHospital, deleteHospital } = require('../controllers/hospitales');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');
const { validJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',validJWT, getHospitals);


router.get('/:id', getHospital);

router.post('/', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    validCamp
], setHospital);

router.put('/:id', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    validCamp
], putHospital);

router.delete('/:id',
        deleteHospital);

module.exports = router