const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Role = sequelize.define('Role', {

        name:{ //General Admin
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        code:{ //ADM-GEN
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        deleted:{
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false,
        }

    }, {});

    return Role;

}