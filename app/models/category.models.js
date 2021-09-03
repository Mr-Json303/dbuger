const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Priority_Level = sequelize.define('Priority_Level', {

        name:{ //bug/UI/suggestion
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description:{ //words
            type: DataTypes.STRING(250),
        },

    }, {});

    return Priority_Level;

}