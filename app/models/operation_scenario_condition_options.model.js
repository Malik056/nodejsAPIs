module.exports = (sequelize, Sequelize) => {
    const operation_scenario_condition_options = sequelize.define("operation_scenario_condition_options", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        operation_scenario_condition_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        options: {
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

    return operation_scenario_condition_options;
};