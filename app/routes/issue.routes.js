const IssueRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const IssueController = require('../controllers/issue.controller');


// TODO test endpoints

IssueRoutes
    .get('/', auth, IssueController.getAll)
    .get('/find/:key/:value', auth, IssueController.getOne)
    .post('/new', auth, IssueController.create)
    .put('/edit/:idEditor/:idRegister', auth, IssueController.edit)
    .delete('/delete/:idEditor/:idRegister', auth, IssueController.remove);

module.exports = IssueRoutes;