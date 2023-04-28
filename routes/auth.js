/*
    Path: /api/login
*/ 
const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');

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


module.exports = router;