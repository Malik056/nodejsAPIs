const db = require("../models");
const quizzes = db.quizzes;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    quizzes.findAll().then(data => {
        res.json({
            'quizzes': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var quiz = {
        user_id: req.body.user_id,
        quiz_code: req.body.quiz_code,
        statement: req.body.statement,
        description: req.body.description,
    };
    // const password = req.body.password;
    console.log('body', req.body);
    // console.log('req_params', req.get());
    console.log(quiz.user_id + quiz.quiz_code  +  quiz.statement  + quiz.description);

    if (!quiz.user_id || !quiz.quiz_code || !quiz.statement || !quiz.description) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating quiz');
        var result = await quizzes.create(quiz);
        //console.log('quiz Create result ', result);
        res.status(201).json({
            quiz: result
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
    const result = await quizzes.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "quiz not found"
        });
        return;
    }

    res.status('200').json({
        message: "quiz Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var quiz = {
        user_id: req.body.user_id,
        quiz_code: req.body.quiz_code,
        statement: req.body.statement,
        description: req.body.description,
    };

    if (!quiz.user_id || !quiz.quiz_code || !quiz.statement || !quiz.description) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await quizzes.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find quiz'
        });
        return;
    }

 try {
        const result = await quizzes.update({
            user_id: req.body.user_id,
            quiz_code: req.body.quiz_code,
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
            messsage: "quiz Updated"
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
    const result = quizzes.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'quizzes': data,
        });
    });
    return;
    
};