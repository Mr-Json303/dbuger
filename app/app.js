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

//MOTOR DB
const db = require('./models');
db.sequelize.sync().then((result) =>{
    console.log('DB Sincronizada OK')
}).catch((err) => {
    console.log('ERROR DB al sincronizar \n', err);
});

//Import de archivos de rutas
const UserRoutes = require('./routes/user.routes');
const RoleRoutes = require('./routes/role.routes');
// const LoginRoutes = require('./routes/login.routes');
// const RegisterRoutes = require('./routes/register.routes');

//Rutas
App.use('/user',UserRoutes);
App.use('/role', RoleRoutes);
// App.use('/login',LoginRoutes);
// App.use('/register',RegisterRoutes);

const PORT = process.env.PORT || 3000;

App.listen(PORT, () =>{
    console.log('API en el puerto:', PORT);
});