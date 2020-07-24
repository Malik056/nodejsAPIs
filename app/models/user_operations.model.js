module.exports = (sequelize, Sequelize) => {
    const user_operations = sequelize.define("user_operations", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        operation_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        operation_title: {
            type: Sequelize.STRING,
            allowNull: false,
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

    return user_operations;
};