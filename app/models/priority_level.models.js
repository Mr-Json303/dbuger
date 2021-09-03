const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Priority_Level = sequelize.define('Priority_Level', {

        name:{ //General Admin
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        color:{ //#ff4578
            type: DataTypes.STRING(10),
        },
        description:{ //ADM-GEN
            type: DataTypes.STRING(250),
        },

    }, {});

    return Priority_Level;

}