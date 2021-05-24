const ProjectRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const ProjectController = require('../controllers/project.controller');


ProjectRoutes
    .get('/', auth, ProjectController.getAll)
    .post('/new', auth, ProjectController.create)
    .get('/find/:key/:value', auth, ProjectController.getOne)
    .put('/edit/:id', auth, ProjectController.edit)
    .delete('/delete/:id', auth, ProjectController.remove);

module.exports = ProjectRoutes;