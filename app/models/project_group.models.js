const {DataTypes} = require ('sequelize');

//This model is define to be a "junction table"
module.exports = (sequelize, Sequelize) => {

    const Project_Group = sequelize.define('Project_Group', {}, {});

    return Project_Group;

}