module.exports = (sequelize, Sequelize) => {
    const quizzes = sequelize.define("quizzes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        quiz_code:  {
            type: Sequelize.STRING,
            allowNull: false
        },

        statement: {
            type: Sequelize.STRING,
            allowNull: false
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

    return quizzes;
};