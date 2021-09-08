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

db.Issue = require("./issue.models")(sequelize, Sequelize);
db.state = require("./state.models")(sequelize, Sequelize);
db.priorityLevel = require("./priority_level.models")(sequelize, Sequelize);
db.tag = require("./tag.models")(sequelize, Sequelize);
db.tagList = require("./tag_list.models")(sequelize, Sequelize);
db.category = require("./category.models")(sequelize, Sequelize);
db.categoryList = require("./category_list.models")(sequelize, Sequelize);

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

//*****************************
//* Issue Table relationships *
//*****************************

// *The project it was generated in
db.Issue.belongsTo(db.Project)

// *The user who created it
db.Issue.belongsTo(db.User, {
  foreignKey: 'id_user_reporter',
} )

// *The User is tasked to solve it
db.Issue.belongsTo(db.User, {
  foreignKey: 'id_user_assignee',
} )

// *The state is currently at
db.Issue.belongsTo(db.state)

// *The priority level it's been assigned
db.Issue.belongsTo(db.priorityLevel)

// *The categories it has
db.Issue.hasMany(db.categoryList)

// *The tags it has
db.Issue.hasMany(db.tagList)

// *Who was the last user to updated
db.Issue.belongsTo(db.User, {
  foreignKey: 'last_updated_by',
} )


//**************************************
//* Tag & Tag_List Table relationships *
//**************************************
db.tag.hasMany(db.tagList)

db.tagList.belongsTo(db.tag)
db.tagList.belongsTo(db.Issue)


//************************************************
//* Category & Category_List Table relationships *
//************************************************
db.category.hasMany(db.categoryList)

db.categoryList.belongsTo(db.category)
db.categoryList.belongsTo(db.Issue)


//*****************************
//* State Table relationships *
//*****************************
db.state.hasMany(db.Issue)


//**************************************
//* Priority_Level Table relationships *
//**************************************
db.priorityLevel.hasMany(db.Issue)


//*FIN\\Modelos Base ********************************************************

module.exports = db;
