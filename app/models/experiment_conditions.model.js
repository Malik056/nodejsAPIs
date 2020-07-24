module.exports = (sequelize, Sequelize) => {
    const experiment_conditions = sequelize.define("experiment_conditions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        experiment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        experiment_conditions_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        experiment_conditions_type: {
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

    return experiment_conditions;
};