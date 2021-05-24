const UserRoutes = require("express").Router();
const auth = require('../middlewares/auth');
const UserController = require("../controllers/user.controller");

UserRoutes

  //Protected endpoints
  .get("/", auth, UserController.getAll)
  .get("/find/:key/:value", UserController.getOne)
  .put("/edit/:key/:value", UserController.update)
  .delete("/delete/:key/:value", UserController.remove)

module.exports = UserRoutes;