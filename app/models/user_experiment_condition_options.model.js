module.exports = (sequelize, Sequelize) => {
    const user_experiment_conditions = sequelize.define("user_experiment_condition_options", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_experiment_question_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        option: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_selected: {
            type: Sequelize.INTEGER,
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

    return user_experiment_conditions;
};