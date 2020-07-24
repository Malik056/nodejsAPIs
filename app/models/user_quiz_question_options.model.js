module.exports = (sequelize, Sequelize) => {
    const user_quiz_question_options = sequelize.define("user_quiz_question_options", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_quiz_question_id:  {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        
        options: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
        is_selected: {
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

    return user_quiz_question_options;
};