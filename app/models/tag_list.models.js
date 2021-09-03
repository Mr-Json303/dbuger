const {DataTypes} = require ('sequelize');

//This model is define to be a "junction table"
module.exports = (sequelize, Sequelize) => {

    const Tag_List = sequelize.define('Tag_List', {}, {});

    return Tag_List;

}