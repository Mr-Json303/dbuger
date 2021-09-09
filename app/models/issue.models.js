const {DataTypes} = require ('sequelize');


module.exports = (sequelize, Sequelize) => {

    const Issue = sequelize.define('Issue', {

        //*> Automated or FK Fields

        //* Id_Issue
        //* Id_Project
        //* Id_user_reporter (user id)
        //* Id_user_assignee (user id)
        //* Id_state
        //* Id_priority_level
        //* Id_category_list
        //* Id_tag_list
        //* Id_tag_list
        //* createdAt
        //* updatedAt
        //* last_updated_by (user id)
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        repeatability: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        deleted:{
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false,
        },

    }, {});

    return Issue;

}