module.exports = (sequelize, Sequelize) => {
    const operations = sequelize.define("operations", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        operations_title: {
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

    return operations;
};