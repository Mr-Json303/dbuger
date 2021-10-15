
const TagListRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const TagListController = require('../controllers/tag_list.controller');


TagListRoutes
    .get('/', auth, TagListController.getAll)
    .get('/find/:key/:value', auth, TagListController.getOne)
    .post('/new', auth, TagListController.create)
    .put('/edit/:id', auth, TagListController.edit)
    .delete('/delete/:id', auth, TagListController.remove);

module.exports = TagListRoutes;