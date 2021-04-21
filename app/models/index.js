
const dbConfig = require('../config/db.config.js');
//const dbConfig = require('../config/db_server.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(

    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }

);

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

//Modelos Base
db.User = require('./user.models')(sequelize,Sequelize);
db.Role = require('./role.models')(sequelize,Sequelize);

//Relaciones
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role);



module.exports = db;