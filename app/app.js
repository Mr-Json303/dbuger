const express = require('express');
const cors = require('cors');
require('dotenv').config({path: __dirname + `/config/.env`});

const App = express();

//Control de URL que acceden a la APIr
const corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost','http://localhost:3000']
}

App.use(express.json()); //antes body parser
App.use(cors(corsOptions));

//DB Engine
const db = require('./models');

// Modify tables if necesary = {alter: true}
// db.sequelize.sync({alter: true}).then((result) =>{
db.sequelize.sync().then((result) =>{
    console.log('DB Sincronizada OK')
}).catch((err) => {
    console.log('ERROR DB al sincronizar \n', err);
});

//Route files import
const UserRoutes = require('./routes/user.routes');
const RoleRoutes = require('./routes/role.routes');
const LoginRegisterRoutes = require('./routes/login_register_user.routes')
const ProjectRoutes = require('./routes/project.routes');
const ProjectGroupRoutes = require('./routes/project_groups.routes')

const IssueRoutes = require('./routes/issue.routes');
const StateRoutes = require('./routes/state.routes');
const PriorityLevelRoutes = require('./routes/priority_level.routes');
const TagRoutes = require('./routes/tag.routes');
const TagListRoutes = require('./routes/tag_list.routes');
const CategoryRoutes = require('./routes/category.routes');
const CategoryListRoutes = require('./routes/category_list.routes');


//Routes
App.use('/', LoginRegisterRoutes);
// App.use('/login', LoginRegisterRoutes);
// App.use('/register', LoginRegisterRoutes);
App.use('/user',UserRoutes);
App.use('/role', RoleRoutes);
App.use('/project', ProjectRoutes);
App.use('/project-group', ProjectGroupRoutes);

App.use('/issues',IssueRoutes);
App.use('/state', StateRoutes);
App.use('/priority-level',PriorityLevelRoutes);
App.use('/tag',TagRoutes);
App.use('/tag-list',TagListRoutes);
App.use('/category',CategoryRoutes);
App.use('/category-list',CategoryListRoutes);

const PORT = process.env.PORT || 4000;

App.listen(PORT, () =>{
    console.log('API en el puerto:', PORT);
});