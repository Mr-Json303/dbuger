const CategoryListRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const CategoryListController = require('../controllers/category_list.controller');


CategoryListRoutes
    .get('/', auth, CategoryListController.getAll)
    .get('/find/:key/:value', auth, CategoryListController.getOne)
    .post('/new', auth, CategoryListController.create)
    .put('/edit/:id', auth, CategoryListController.edit)
    .delete('/delete/:id', auth, CategoryListController.remove);

module.exports = CategoryListRoutes;