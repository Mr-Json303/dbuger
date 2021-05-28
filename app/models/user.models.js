const {DataTypes} = require ('sequelize');


module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {

        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        deleted: {
            type: DataTypes.BOOLEAN(),
            allowNull: true
        },

    }, {});

    return User;

}