// const Sequelize = require('sequelize');
// const sequelize = new Sequelize();
module.exports = (sequelize, Sequelize) => {
    const documents = sequelize.define("documents", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        _name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        _type: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        file_url: {
            type: Sequelize.TEXT,
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
    return documents;
};