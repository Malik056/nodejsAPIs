module.exports = (sequelize, Sequelize) => {
    const operation_scenario_conditions_msca = sequelize.define("operation_scenario_conditions_msca", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        operation_scenario_condition_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        answer: {
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

    return operation_scenario_conditions_msca;
};