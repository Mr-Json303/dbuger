const dbConfig = require("../config/db.config.js");
//const dbConfig = require('../config/db_server.config.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Modelos Base ***********************************************************
db.Project = require("./project.models")(sequelize, Sequelize);
db.ProjectGRoup = require("./project_group.models")(sequelize, Sequelize);
db.User = require("./user.models")(sequelize, Sequelize);
db.Role = require("./role.models")(sequelize, Sequelize);

//Relaciones modelos base
db.Project.belongsTo(db.User, {
  foreignKey: 'id_project_creator',
} )
db.User.hasMany(db.ProjectGRoup)
db.Role.hasMany(db.ProjectGRoup)
db.Project.hasMany(db.ProjectGRoup)

db.ProjectGRoup.belongsTo(db.User)
db.ProjectGRoup.belongsTo(db.Role)
db.ProjectGRoup.belongsTo(db.Project)


//FIN\\Modelos Base ********************************************************

module.exports = db;
