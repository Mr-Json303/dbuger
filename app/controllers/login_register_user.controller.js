const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

//REGISTER FUNCTION=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function register(req, res) {
  //   console.log("req.body:", req.body);

  console.log(authConfig.rounds);

  //Contraseña encriptada
  let varPassword = await bcrypt.hash(
    req.body.password,
    parseInt(authConfig.rounds)
  );

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: varPassword,
  };

  console.log("Datos Rec:", newUser);

  db.User.create(newUser)
    .then((user) => {
      res.status(201).send({
        msg: "New User registered correctly",
        user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error trying to register new user",
        err,
      });
    });
}
//\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//LOGIN FUNCTION=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function login(req, res) {
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };

  const varUser = await db.User.findOne({
    where: { email: req.body.email },
  });

  if (varUser) {
    if (bcrypt.compareSync(req.body.password, varUser.password)) {
      //Successfull login
      let token = jwt.sign(
        {
          id: varUser.id,
          email: req.body.email,
          roleid: varUser.RoleId,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expires,
        }
      );

      const data = {
        token: token,
        id: varUser.id,
        email: req.body.email,
        roleid: varUser.RoleId,
      };

      res.status(202).send({
        msg: "Login was Successful",
        data,
      });
    } else {
      //The password was incorrect
      res.status(500).send({
        msg: "Login error CODE: 002",
      });
    }
  } else {
    res.status(500).send({
      msg: "Login Error CODE: 001",
    });
  }
}
//\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



//\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function verifyToken(req, res) {

  // console.log('req headers \n', req.headers );
  let token = req.body.token;

  if (!token) {
    const error = new Error("No Authorization code");
    error.statusCode = 401;
    throw error;
  }

  let verifyToken;

  try {
    verifyToken = jwt.verify(token, authConfig.secret);
  } catch (error) {
    error.statusCode = 401;
    res.status(401).send({error: '401'})  
  }

  console.log("Resultado de verify: ", verifyToken);

  token = jwt.sign(
    {
      id: verifyToken.id,
      email: verifyToken.email,
      roleid: verifyToken.RoleId,
    },
    authConfig.secret,
    {
      expiresIn: authConfig.expires,
    }
  );

  const data = {
    token: token,
    id: verifyToken.id,
    email: verifyToken.email,
    roleid: verifyToken.RoleId,
  };

  res.status(200).send({
    msg: "Login was Successful",
    data,
  });
}
//\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

module.exports = {
  register,
  login,
  verifyToken,
};
