module.exports = (sequelize, Sequelize) => {
    const api_keys = sequelize.define("api_keys", {
        api_key: {
            type: Sequelize.STRING,
            primaryKey: true
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
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    });

    return api_keys;
};