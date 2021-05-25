const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

function getAll(req, res) {
  db.User.findAll({
    attributes: ["id", "name", "email"],
  })
    .then((registers) => {
      res.status(200).send({
        msg: "Everything OK from users root",
        registers,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Something went wrong",
      });
    });
}

function getOne(req, res) {
  const key = req.params.key;
  const value = req.params.value;

  db.User.findAll({
    attributes: ["id", "name", "email"],
    where: { [key]: value },
  })
    .then((register) => {
      res.status(200).send(register);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error",
        error: err.errors[0].message,
      });
    });
}

async function edit(req, res) {
  //Check Logout with Pablo

  const idReg = req.params.id;
  const idLoggedUser = req.loggedUser.id;
  console.log("Logged User \n", req.loggedUser);
  console.log("params id \n", req.params.id);

  if (idReg == idLoggedUser) {
    let varPassword = req.body.password;

    if (req.body.password) {
      varPassword = await bcrypt.hash(
        req.body.password,
        parseInt(authConfig.rounds)
      );
    }

    let editRegister = {
      name: req.body.name,
      email: req.body.email,
      password: varPassword,
    };

    db.User.update(editRegister, {
      where: { id: idReg },
    })
      .then((register) => {
        res.status(200).send({
          msg: "OK actualizado correctamente",
          register: register,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error en la actualizacion",
          error: err,
        });
      });
  } else {
    res.status(403).send({
      msg: "You are not allowed to perform this action",
    });
  }
}

async function remove(req, res) {

  let idReg = req.params.id;

  try {
    await db.User.destroy({
      where: {
        id: idReg,
      },
    });
    res.status(200).send({ 
      message: "The register was removed succesfully" 
    });
  } catch (error) {
    res
      .status(500)
      .send({ 
        message: "No se pudo efectuar la accion de eliminar", 
        error 
      });
  }
}

module.exports = {
  getAll,
  getOne,
  edit,
  remove,
};
