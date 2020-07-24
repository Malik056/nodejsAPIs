module.exports = (sequelize, Sequelize) => {
    const user_quiz_question_multi_select_correct_answers = sequelize.define("user_quiz_question_multi_select_correct_answers", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_quiz_question_id: {
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

    return user_quiz_question_multi_select_correct_answers;
};