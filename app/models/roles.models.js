const {DataTypes} = require ('sequelize');


module.exports = (sequelize, Sequelize) => {

    const Role = sequelize.define('Role', {

        nombre:{ //General Admin
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        codigo:{ //ADM-GEN
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },

    }, {});

    return Role;

}