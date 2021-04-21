const RoleRoutes = require('express').Router();

const RoleController = require('../controllers/role.controller');

//auth

// /api/signin
RoleRoutes
    .get('/', RoleController.getAll)
    .post('/new', RoleController.create)
    .get('/find/:key/:value', RoleController.getWhere)
    .put('/edit/:id', RoleController.update)
    .delete('/delete/:id', RoleController.remove);

module.exports = RoleRoutes;