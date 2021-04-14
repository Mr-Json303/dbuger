const UserRoutes = require('express').Router();

const UserController = require('../controllers/user.controller')

UserRoutes.get('/',UserController.root);
UserRoutes.get('/find',UserController.find);

/*UserRoutes.get('/', (req, res) => {
    res.status(200).send({msg : 'OK'});
});*/

/*UserRoutes.get('/find', (req, res) => {
    res.status(200).send({msg : 'OK desde buscar'});
});*/

module.exports = UserRoutes;