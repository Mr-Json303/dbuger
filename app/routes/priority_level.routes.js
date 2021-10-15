const PriorityLevelRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const PriorityLevelController = require('../controllers/priority_level.controller');


PriorityLevelRoutes
    .get('/', auth, PriorityLevelController.getAll)
    .get('/find/:key/:value', auth, PriorityLevelController.getOne)
    .post('/new', auth, PriorityLevelController.create)
    .put('/edit/:id', auth, PriorityLevelController.edit)
    .delete('/delete/:id', auth, PriorityLevelController.remove);

module.exports = PriorityLevelRoutes;