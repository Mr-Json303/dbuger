const ProjectGroupRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const ProjectGroupController = require('../controllers/project_group.controller');


ProjectGroupRoutes
    .get('/', auth, ProjectGroupController.getAll)
    .post('/new', auth, ProjectGroupController.create)
    .get('/find/:key/:value', auth, ProjectGroupController.getOne)
    .put('/edit/:id', auth, ProjectGroupController.edit)
    .delete('/delete/:id', auth, ProjectGroupController.remove);

module.exports = ProjectGroupRoutes;