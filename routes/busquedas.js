// RUTA: api/all

const { Router } = require('express');
const { getResult, getColUser } = require('../controllers/busquedas');
const { validJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:busqueda',validJWT, getResult);
router.get('/:table/:busqueda',validJWT, getColUser);




module.exports = router