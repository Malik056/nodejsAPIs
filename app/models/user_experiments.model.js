module.exports = (sequelize, Sequelize) => {
    const user_experiments = sequelize.define("user_experiments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        experiment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        experiment_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        experiment_sameple: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        answer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        feedback: {
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

    return user_experiments;
};