module.exports = (sequelize, Sequelize) => {
    const quiz_questions = sequelize.define("quiz_questions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        quiz_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        question_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        question_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_yes: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        
        correct_answer: {
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

    return quiz_questions;
};