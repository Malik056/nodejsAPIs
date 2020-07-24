module.exports = (sequelize, Sequelize) => {
    const user_operation_scenario_condition_options = sequelize.define("user_operation_scenario_condition_options", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_operation_scenario_condition_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        option: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_selected: {
            type: Sequelize.BOOLEAN,
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

    return user_operation_scenario_condition_options;
};