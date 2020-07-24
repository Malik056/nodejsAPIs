module.exports = (sequelize, Sequelize) => {
    const operation_scenario_conditions = sequelize.define("operation_scenario_conditions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        operation_scenario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        scenario_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        scenario_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_yes: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        
        correct_answer: {
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

    return operation_scenario_conditions;
};