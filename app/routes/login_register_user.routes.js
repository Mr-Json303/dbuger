const LoginRegisterRoutes = require("express").Router();

const LoginRegisterController = require("../controllers/login_register_user.controller");

//unprotected endpoints

LoginRegisterRoutes.post("/register", LoginRegisterController.register);

LoginRegisterRoutes.post("/login", LoginRegisterController.login);


module.exports = LoginRegisterRoutes;