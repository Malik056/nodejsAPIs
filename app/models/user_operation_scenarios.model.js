module.exports = (sequelize, Sequelize) => {
    const user_operation_scenarios = sequelize.define("user_operation_scenarios", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_operation_critical_points_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        scenario_title: {
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

    return user_operation_scenarios;
};