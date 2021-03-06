module.exports = (sequelize, Sequelize) => {
    const user_operation_critical_points = sequelize.define("user_operation_critical_points", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_operation_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        critical_point_title: {
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

    return user_operation_critical_points;
};