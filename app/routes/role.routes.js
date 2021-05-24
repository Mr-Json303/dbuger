const RoleRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const RoleController = require('../controllers/role.controller');


RoleRoutes
    .get('/', auth, RoleController.getAll)
    .post('/new', auth, RoleController.create)
    .get('/find/:key/:value', auth, RoleController.getOne)
    .put('/edit/:id', auth, RoleController.edit)
    .delete('/delete/:id', auth, RoleController.remove);

module.exports = RoleRoutes;