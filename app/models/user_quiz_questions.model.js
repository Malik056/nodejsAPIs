module.exports = (sequelize, Sequelize) => {
    const users_quiz_questions = sequelize.define("users_quiz_questions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_quiz_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        question_title:  {
            type: Sequelize.STRING,
            allowNull: false
        },

        question_type: {
            type: Sequelize.STRING,
            allowNull: false
        },

        answer: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        is_yes: {
            type: Sequelize.BOOLEAN,
            allowNull: false
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

    return users_quiz_questions;
};