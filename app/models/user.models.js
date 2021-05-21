const {DataTypes} = require ('sequelize');


module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {

        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        }

    }, {});

    return User;

}