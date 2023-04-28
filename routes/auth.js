/*
    Path: /api/login
*/ 
const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');
const { validJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',[
    body('password','El password es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    validCamp
],login);

router.post('/google',[
    body('token','El token es obligatorio').not().isEmpty(),
    validCamp
],googleSingIn);

router.get('/renew',validJWT,renewToken);


module.exports = router;