const {DataTypes} = require ('sequelize');

module.exports = (sequelize, Sequelize) => {

    const Project = sequelize.define('Project', {

        name:{ 
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description:{ 
            type: DataTypes.STRING(200),
        }

    }, {});

    return Project;

}