const db = require("../models");
const user_quiz_questions = db.user_quiz_questions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_quiz_questions.findAll().then(data => {
        res.json({
            'user_quiz_questions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_quiz_question = {
        user_quiz_id: req.body.user_quiz_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        answer: req.body.answer,
        is_yes: req.body.is_yes,
    };
    console.log('body', req.body);
   
    //console.log(user_quiz_question.user_id + user_quiz_question.quiz_id  +  user_quiz_question.statement  + user_quiz_question.description);

    if (!user_quiz_question.user_quiz_id || !user_quiz_question.question_title || !user_quiz_question.question_type || !user_quiz_question.answer || !user_quiz_question.is_yes) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_quiz_question');
        var result = await user_quiz_questions.create(user_quiz_question);
        //console.log('user_quiz_question Create result ', result);
        res.status(201).json({
            user_quiz_question: result
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
    const result = await user_quiz_questions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_quiz_question not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_quiz_question Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_quiz_question = {
        user_quiz_id: req.body.user_quiz_id,
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        answer: req.body.answer,
        is_yes: req.body.is_yes,
    };
    console.log('body', req.body);
   
    //console.log(user_quiz_question.user_id + user_quiz_question.quiz_id  +  user_quiz_question.statement  + user_quiz_question.description);

    if (!user_quiz_question.user_quiz_id || !user_quiz_question.question_title || !user_quiz_question.question_type || !user_quiz_question.answer || !user_quiz_question.is_yes) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_quiz_questions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_quiz_question'
        });
        return;
    }

 try {
        const result = await user_quiz_questions.update({
            user_quiz_id: req.body.user_quiz_id,
            question_title: req.body.question_title,
            question_type: req.body.question_type,
            answer: req.body.answer,
            is_yes: req.body.is_yes,
        }, {
            where: {
                id: id
            }
        });
        console.log(result);
        if (result[0] <= 0) {
            res.status(500).json({
                message: "error: " + eS
            });
            return;
        }
        res.status(200).json({
            messsage: "user_quiz_question Updated"
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
    const result = user_quiz_questions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_quiz_questions': data,
        });
    });
    return;
    
};