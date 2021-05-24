const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

function getAll(req, res) {

    db.User.findAll({
        attributes:["id", "email"],
        include: [{model: db.Role, attributes: ["id", "name", "code"]}]
    }).then((registers) => {
        
        res.status(200).send({
            msg:'Everything OK from users root',
            registers
        })

    } ).catch((err) => {
        res.status(200).send({
            msg:'Something went wrong',
        })
    })
}

function getOne(req, res) {}


function update(req, res) {}


function remove(req, res) {}

module.exports = {
  getAll,
  getOne,
  update,
  remove,
};
