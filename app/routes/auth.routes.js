const AuthRoutes = require('express').Router();

const loginController = require('../controllers/login.controller');

// /api/signin
AuthRoutes.post('/login', loginController);


module.exports = AuthRoutes;