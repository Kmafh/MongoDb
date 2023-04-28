/*
    RUTA: /api/medicos
*/ 


const { Router } = require('express');
const { getMedico, getMedicos, setMedico, putMedico, deleteMedico } = require('../controllers/medicos');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');
const { validJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',validJWT, getMedicos);


router.get('/:id', getMedico);

router.post('/', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('hospitales','El nombre es obligatorio').isMongoId(),
    validCamp
], setMedico);

router.put('/:id', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('usuario','El usuario es obligatorio').not().isEmpty(),
    body('hospitales','El hospital es obligatorio').isEmail(),
    validCamp
], putMedico);

router.delete('/:id', validJWT,
        deleteMedico);

module.exports = router