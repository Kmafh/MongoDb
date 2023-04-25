// RUTA: /api/usuarios

const { Router } = require('express');
const { getUsuarios, setUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');

const router = Router();

router.get('/', 
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('password','El password es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').not().isEmail(),
        ], 
        getUsuarios);
router.post('/', setUsuario);

module.exports = router