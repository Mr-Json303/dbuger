const TagRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const TagController = require('../controllers/tag.controller');


TagRoutes
    .get('/', auth, TagController.getAll)
    .get('/find/:key/:value', auth, TagController.getOne)
    .post('/new', auth, TagController.create)
    .put('/edit/:id', auth, TagController.edit)
    .delete('/delete/:id', auth, TagController.remove);

module.exports = TagRoutes;