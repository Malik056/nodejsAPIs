module.exports = (sequelize, Sequelize) => {
    const user_experiment_conditions = sequelize.define("user_experiment_conditions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_experiment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        user_experiment_condition_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        user_experiment_condition_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_yes: {
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

    return user_experiment_conditions;
};