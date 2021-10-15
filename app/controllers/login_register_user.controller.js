const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

//REGISTER FUNCTION=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function register(req, res, next) {
  console.log("req.body entrando al register: ", req.body);

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
      console.log('user created: ', user);
      req.body.email = user.email
      req.body.password = req.body.password
      // res.status(201).send({
      //   msg: "New User registered correctly",
      //   user,
      // });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error trying to register new user",
        err,
      });
    }).finally( function(){
      console.log("req.body en el finally:  ", req.body);
      next()
    } );

    
}
//\\=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

async function testSearch(req, res){

  console.log('\nreq.body de register', req.body);
  console.log('\nres.body de register', res);

  try {

    res.status(200).send({
      msg: "register was successful",
      User: req.body
    })
  
  } catch (error) {
    res.status(500).send({
      msg: "something happened",
      error
    }) 
  }
}

//LOGIN FUNCTION=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function login(req, res) {

  console.log("req.body entrando al login: ", req.body);

  const varUser = await db.User.findOne({
    where: { email: req.body.email },
  });

  console.log("User found on DB: ", varUser);
 
  if (varUser) {
    if (bcrypt.compareSync(req.body.password, varUser.password)) {
      console.log("Successful Login");
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
        varUser
      });
    }
  } else {
    res.status(500).send({
      msg: "Login Error CODE: 001",
      varUser
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
  testSearch
};
