const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const State = sequelize.define('State', {

        name:{ //Resolved/open/in progress
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        code:{ //wip/end
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },

    }, {});

    return State;

}