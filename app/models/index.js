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

db.State = require("./state.models")(sequelize, Sequelize);
db.PriorityLevel = require("./priority_level.models")(sequelize, Sequelize);
db.Tag = require("./tag.models")(sequelize, Sequelize);
db.TagList = require("./tag_list.models")(sequelize, Sequelize);
db.Category = require("./category.models")(sequelize, Sequelize);
db.CategoryList = require("./category_list.models")(sequelize, Sequelize);
db.Issue = require("./issue.models")(sequelize, Sequelize, db);

//Relaciones modelos base
db.Project.belongsTo(db.User, {
  foreignKey: 'id_project_creator',
})
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
  as: 'ReporterUser',
  foreignKey: 'ReporterId',
})

// *The User is tasked to solve it
db.Issue.belongsTo(db.User, {
  as: 'AssignedUser',
  foreignKey: 'AssigneeId',
})

// *The state is currently at
db.Issue.belongsTo(db.State)

// *The priority level it's been assigned
db.Issue.belongsTo(db.PriorityLevel)

// *The categories it has
db.Issue.hasMany(db.CategoryList)

// *The tags it has
db.Issue.hasMany(db.TagList)

// *Who was the last user to updated
db.Issue.belongsTo(db.User, {
  as: 'LastUpdatedByUser',
  foreignKey: 'lastUpdatedBy',
})


//**************************************
//* Tag & Tag_List Table relationships *
//**************************************
db.Tag.hasMany(db.TagList)

db.TagList.belongsTo(db.Tag)
db.TagList.belongsTo(db.Issue)


//************************************************
//* Category & Category_List Table relationships *
//************************************************
db.Category.hasMany(db.CategoryList)

db.CategoryList.belongsTo(db.Category)
db.CategoryList.belongsTo(db.Issue)


//*****************************
//* State Table relationships *
//*****************************
db.State.hasMany(db.Issue)


//**************************************
//* Priority_Level Table relationships *
//**************************************
db.PriorityLevel.hasMany(db.Issue)


//*FIN\\Modelos Base ********************************************************

module.exports = db;
