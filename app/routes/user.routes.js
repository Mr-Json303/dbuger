const UserRoutes = require('express').Router();

const UserController = require('../controllers/user.controller');

//const auth =

UserRoutes
    .get('/', UserController.getAll)
    .post('/new', UserController.create)
    .get('/find/:key/:value', UserController.getOne)
    .put('/edit/:key/:value', UserController.update)
    .delete('/delete/:key/:value', UserController.remove);
/*UserRoutes.get('/', (req, res) => {
    res.status(200).send({msg : 'OK'});
});*/

/*UserRoutes.get('/find', (req, res) => {
    res.status(200).send({msg : 'OK desde buscar'});
});*/

module.exports = UserRoutes;