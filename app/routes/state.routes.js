const StateRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const StateController = require('../controllers/state.controller');


StateRoutes
    .get('/', auth, StateController.getAll)
    .get('/find/:key/:value', auth, StateController.getOne)
    .post('/new', auth, StateController.create)
    .put('/edit/:id', auth, StateController.edit)
    .delete('/delete/:id', auth, StateController.remove);

module.exports = StateRoutes;