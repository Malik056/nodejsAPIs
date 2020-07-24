module.exports = (sequelize, Sequelize) => {
    const experiment_parameters = sequelize.define("experiment_parameters", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        experiment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        max_range: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        min_range: {
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

    return experiment_parameters;
};