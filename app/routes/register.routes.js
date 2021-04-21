const RegisterRoutes = require('express').Router();

const RegisterController = require('../controllers/register.controller');

// /api/signup
RegisterRoutes.post('/', RegisterController.signUp);

module.exports = RegisterRoutes;