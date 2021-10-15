const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define('Category', {

        name:{ //bug/UI/suggestion
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description:{ //words
            type: DataTypes.STRING(250),
        },

    }, {});

    return Category;

}