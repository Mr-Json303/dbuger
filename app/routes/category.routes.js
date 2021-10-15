const CategoryRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const CategoryController = require('../controllers/category.controller');


CategoryRoutes
    .get('/', auth, CategoryController.getAll)
    .get('/find/:key/:value', auth, CategoryController.getOne)
    .post('/new', auth, CategoryController.create)
    .put('/edit/:id', auth, CategoryController.edit)
    .delete('/delete/:id', auth, CategoryController.remove);

module.exports = CategoryRoutes;