module.exports = (sequelize, Sequelize) => {
    const user_quizzes = sequelize.define("user_quizzes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        quiz_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        statement: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        description: {
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

    return user_quizzes;
};