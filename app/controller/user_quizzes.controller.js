const db = require("../models");
const user_quizzes = db.user_quizzes;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_quizzes.findAll().then(data => {
        res.json({
            'user_quizzes': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_quiz = {
        user_id: req.body.user_id,
        quiz_id: req.body.quiz_id,
        statement: req.body.statement,
        description: req.body.description,
    };
    console.log('body', req.body);
   
    console.log(user_quiz.user_id + user_quiz.quiz_id  +  user_quiz.statement  + user_quiz.description);

    if (!user_quiz.user_id || !user_quiz.quiz_id || !user_quiz.statement || !user_quiz.description) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_quiz');
        var result = await user_quizzes.create(user_quiz);
        //console.log('user_quiz Create result ', result);
        res.status(201).json({
            user_quiz: result
        });
    } catch (e) {
        res.status(500).json({
            message: e
        });
        return;
    }
};

exports.delete = async (req, res, next) => {
    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    const result = await user_quizzes.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_quiz not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_quiz Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_quiz = {
        user_id: req.body.user_id,
        quiz_id: req.body.quiz_id,
        statement: req.body.statement,
        description: req.body.description,
    };

    if (!user_quiz.user_id || !user_quiz.quiz_id || !user_quiz.statement || !user_quiz.description) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_quizzes.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_quiz'
        });
        return;
    }

 try {
        const result = await user_quizzes.update({
            user_id: req.body.user_id,
            quiz_id: req.body.quiz_id,
            statement: req.body.statement,
            description: req.body.description,
        }, {
            where: {
                id: id
            }
        });
        console.log(result);
        if (result[0] <= 0) {
            res.status(500).json({
                message: "error: " + e
            });
            return;
        }
        res.status(200).json({
            messsage: "user_quiz Updated"
        });
    } catch (e) {
        res.status(500).json({
            message: 'error: ' + e
        });
        return;
    };
};

exports.findOne = async (req, res, next) => {
    if (!req.body.id) {
        return responses.sendInvalidParameters(res);
    }
    const result = user_quizzes.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_quizzes': data,
        });
    });
    return;
    
};