const LoginRegisterRoutes = require("express").Router();

const LoginRegisterController = require("../controllers/login_register_user.controller");

//unprotected endpoints

LoginRegisterRoutes.post("/register", LoginRegisterController.register, LoginRegisterController.login);

LoginRegisterRoutes.post("/login", LoginRegisterController.login);

LoginRegisterRoutes.post("/verifyToken", LoginRegisterController.verifyToken);


module.exports = LoginRegisterRoutes;