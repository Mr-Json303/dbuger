const express = require('express');
const cors = require('cors');
require('dotenv').config({path: __dirname + `/config/.env`});

const App = express();

//Control de URL que acceden a la APIr
const corsOptions = {
    origin: ['https://localhost:4000', 'http://localhost']
}

App.use(express.json()); //antes body parser
App.use(cors(corsOptions));

//DB Engine
const db = require('./models');
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


//Routes
App.use('/auth', LoginRegisterRoutes);
App.use('/user',UserRoutes);
App.use('/role', RoleRoutes);
App.use('/project', ProjectRoutes);
App.use('/project-group', ProjectGroupRoutes);


const PORT = process.env.PORT || 3000;

App.listen(PORT, () =>{
    console.log('API en el puerto:', PORT);
});