module.exports = (sequelize, Sequelize) => {
    const experiment_condition_options = sequelize.define("experiment_condition_options", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        experiment_condition_id: {
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

    return experiment_condition_options;
};