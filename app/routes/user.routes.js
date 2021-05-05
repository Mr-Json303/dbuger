const UserRoutes = require("express").Router();
const auth = require('../middlewares/auth');
const UserController = require("../controllers/user.controller");

//const auth =

UserRoutes

  //Protected endpoints
  .get("/", auth, UserController.getAll)
  .get("/find/:key/:value", UserController.getOne)
  .put("/edit/:key/:value", UserController.update)
  .delete("/delete/:key/:value", UserController.remove)

  //unprotected endpoints
  .post("/register", UserController.create)
  .post("/login", UserController.login);

module.exports = UserRoutes;
