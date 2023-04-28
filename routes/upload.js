// RUTA: api/upload

const { Router } = require('express');
const { putUpload, getImg } = require('../controllers/upload');
const { validJWT } = require('../middlewares/validate-jwt');
const fileUpload  = require('express-fileupload');

const router = Router();

router.use(fileUpload())
router.put('/:table/:id',validJWT, putUpload);
router.get('/:table/:img',getImg);





module.exports = router