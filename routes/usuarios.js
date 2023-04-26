// RUTA: /api/usuarios

const { Router } = require('express');
const { getUsuario, getUsuarios, setUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');
const { validJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',validJWT, getUsuarios);


router.get('/:id', getUsuario);

router.post('/', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('password','El password es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    validCamp
], setUsuario);

router.put('/:id', 
[
    validJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    body('role','El rol es obligatorio').not().isEmpty(),
    validCamp
], putUsuario);

router.delete('/:id', validJWT,
        deleteUsuario);

module.exports = router