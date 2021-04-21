const LoginRoutes = require('express').Router();

const loginController = require('../controllers/login.controller');

// /api/signin
LoginRoutes.post('/login', loginController.signIn);


module.exports = LoginRoutes;