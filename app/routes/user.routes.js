const UserRoutes = require("express").Router();
const auth = require('../middlewares/auth');
const UserController = require("../controllers/user.controller");

UserRoutes

  //Protected endpoints
  .get("/", auth, UserController.getAll)
  .get("/find/:key/:value", auth, UserController.getOne)
  .put("/edit/:id", auth, UserController.edit)
  .delete("/delete/:id", auth, UserController.remove)

module.exports = UserRoutes;