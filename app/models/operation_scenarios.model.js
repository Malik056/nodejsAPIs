module.exports = (sequelize, Sequelize) => {
    const operation_scenarios = sequelize.define("operation_scenarios", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        operation_critical_point_id: {
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

    return operation_scenarios;
};