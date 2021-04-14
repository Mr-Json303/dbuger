const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'/app/config/.env'});

const App = express();

//Control de URL que acceden a la API
const corsOptions = {
    origin: ['https://localhost:4000', 'http://localhost']
}

App.use(express.json()); //antes body parser
App.use(cors(corsOptions));

//MOTOR DB
const db = require('./models');
db.sequelize.sync({}).then((result) =>{
    console.log('DB Sincronizada OK')
}).catch((err) => {
    console.log('ERROR DB al sincronizar \n', err);
});

//Rutas
const UserRoutes = require('./routes/usuarios.routes');
App.use('/user',UserRoutes);

const PORT = process.env.PORT || 3000;

App.listen(PORT, () =>{
    console.log('API en el puerto:', PORT);
});