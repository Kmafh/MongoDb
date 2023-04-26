/*
    Path: /api/login
*/ 
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { body } = require('express-validator');
const { validCamp } = require('../middlewares/valid-camp');

const router = Router();

router.post('/',[
    body('password','El password es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    validCamp
],login);



module.exports = router;