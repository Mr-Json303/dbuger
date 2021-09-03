const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Tag = sequelize.define('Tag', {

        name:{ //General Admin
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description:{ //ADM-GEN
            type: DataTypes.STRING(250),
        },

    }, {});

    return Tag;

}