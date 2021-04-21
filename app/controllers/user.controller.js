const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const auth = require('../config/auth');

// (req, res) => {
//     res.status(200).send({msg : 'OK'});
// }

function getAll(req, res){

};

function getOne(req, res){

};

function create(req, res){

    //Contraseña encriptada
    let = varPassword = bcrypt.hashSync(req.body.password, authConfig.rounds);

    User.create = ({
        email: req.body.email,
        password: varPassword 
    }).then(user => {

        let token = jwt.sign({user: user}, authConfig.secret, {
            expiresIn : authConfig.expires
        });

        res.json({
            user: user,
            token: token
        })

    }).catch(err => {
        res.status(500).json(err);
    });

};

function update(req, res){

};

function remove(req, res){

};

//function update(req, res);

//function remove(req, res);

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}