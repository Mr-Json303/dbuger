const {DataTypes} = require ('sequelize');

//This model is define to be a "junction table"
module.exports = (sequelize, Sequelize) => {

    const Category_List = sequelize.define('Category_List', {}, {});

    return Category_List;

}