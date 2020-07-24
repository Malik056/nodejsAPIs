module.exports = (sequelize, Sequelize) => {
    const user_experiment_parameters = sequelize.define("user_experiment_parameters", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_experiment_id: {
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

    return user_experiment_parameters;
};