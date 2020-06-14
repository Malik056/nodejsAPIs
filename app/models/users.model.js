module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name:  {
            type: Sequelize.TEXT,
            allowNull: false
        },
        last_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        _password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        _role: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        license_key: {
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

    return users;
};