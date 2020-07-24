const db = require("../models");
const quiz_questions = db.quiz_questions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    quiz_questions.findAll().then(data => {
        res.json({
            'quiz_questions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var quiz_question = {
        quiz_id: req.body.quiz_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        is_yes: req.body.is_yes,
        correct_answer: req.body.correct_answer,
    };
    // const password = req.body.password;
    console.log('body', req.body);
    // console.log('req_params', req.get());
    //console.log(quiz_question.user_id + quiz_question.quiz_code  +  quiz_question.statement  + quiz_question.description);

    if (!quiz_question.quiz_id || !quiz_question.question_title || !quiz_question.question_type || !quiz_question.is_yes || !quiz_question.correct_answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating quiz_question');
        var result = await quiz_questions.create(quiz_question);
        //console.log('quiz_question Create result ', result);
        res.status(201).json({
            quiz_question: result
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
    const result = await quiz_questions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "quiz_question not found"
        });
        return;
    }

    res.status('200').json({
        message: "quiz_question Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var quiz_question = {
        quiz_id: req.body.quiz_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        is_yes: req.body.is_yes,
        correct_answer: req.body.correct_answer,
    };
    console.log(quiz_question.quiz_id + quiz_question.question_title + quiz_question.question_type + quiz_question.is_yes + quiz_question.correct_answer)
    if (!quiz_question.quiz_id || !quiz_question.question_title || !quiz_question.question_type || !quiz_question.is_yes || !quiz_question.correct_answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await quiz_questions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find quiz_question'
        });
        return;
    }

 try {
        const result = await quiz_questions.update({
            quiz_id: req.body.quiz_id,
            question_title: req.body.question_title,
            question_type: req.body.question_type,
            is_yes: req.body.is_yes,
            correct_answer: req.body.correct_answer,
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
            messsage: "quiz_question Updated"
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
    const result = quiz_questions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'quiz_questions': data,
        });
    });
    return;
    
};