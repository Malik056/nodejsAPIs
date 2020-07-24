const db = require("../models");
const quiz_question_multi_select_correct_answers = db.quiz_question_multi_select_correct_answers;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    quiz_question_multi_select_correct_answers.findAll().then(data => {
        res.json({
            'quiz_question_multi_select_correct_answers': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var quiz_question_multi_select_correct_answer = {
        quiz_question_id: req.body.quiz_question_id,
        answer: req.body.answer,
    };
    console.log('body', req.body);
    
    if (!quiz_question_multi_select_correct_answer.quiz_question_id || !quiz_question_multi_select_correct_answer.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating quiz_question_multi_select_correct_answer');
        var result = await quiz_question_multi_select_correct_answers.create(quiz_question_multi_select_correct_answer);
        //console.log('quiz_question_multi_select_correct_answer Create result ', result);
        res.status(201).json({
            quiz_question_multi_select_correct_answer: result
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
    const result = await quiz_question_multi_select_correct_answers.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "quiz_question_multi_select_correct_answer not found"
        });
        return;
    }

    res.status('200').json({
        message: "quiz_question_multi_select_correct_answer Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var quiz_question_multi_select_correct_answer = {
        quiz_question_id: req.body.quiz_question_id,
        answer: req.body.answer,
    };
   
    console.log('body', req.body);
   
    if (!quiz_question_multi_select_correct_answer.quiz_question_id || !quiz_question_multi_select_correct_answer.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await quiz_question_multi_select_correct_answers.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find quiz_question_multi_select_correct_answer'
        });
        return;
    }

 try {
        const result = await quiz_question_multi_select_correct_answers.update({
            quiz_question_id: req.body.quiz_question_id,
            answer: req.body.answer,
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
            messsage: "quiz_question_multi_select_correct_answer Updated"
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
    const result = quiz_question_multi_select_correct_answers.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'quiz_question_multi_select_correct_answers': data,
        });
    });
    return;
    
};