// const Sequelize = require('sequelize');
// const sequelize = new Sequelize();
module.exports = (sequelize, Sequelize) => {
    const user_documents = sequelize.define("user_documents", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        submitted_to: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        submitted_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        _name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        _type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        deletedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
            allowNull: true
        }
    });
    return user_documents;
};