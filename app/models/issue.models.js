const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize, db) => {

    const Issue = sequelize.define('Issue', {

        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        repeatability: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false,
        },

    }, {});

    Issue.attributes = [
        ["id", "IssueId"],
        "name",
        "description",
        "repeatability",
        "deleted"
    ];
    Issue.include = [{
        model: db.Project,
        attributes: ['id','name']
    },{
        model: db.User,
        as: 'ReporterUser',
        attributes: ['id','name', 'email']
    },{
        model: db.User,
        as: 'AssignedUser',
        attributes: ['id','name', 'email']
    },{
        model: db.User,
        as: 'LastUpdatedByUser',
        attributes: ['id','name', 'email']
    },{
        model: db.State,
        attributes: ['id', 'name']
    },{
        model: db.PriorityLevel,
        attributes: ['id', 'name']
    }];

    return Issue;

}