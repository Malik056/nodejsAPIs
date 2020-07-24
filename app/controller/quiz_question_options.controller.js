const db = require("../models");
const quiz_question_options = db.quiz_question_options;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    quiz_question_options.findAll().then(data => {
        res.json({
            'quiz_question_options': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var quiz_question_option = {
        question_id: req.body.question_id,
        options: req.body.options,
    };
    // const password = req.body.password;
    console.log('body', req.body);
    // console.log('req_params', req.get());
    //console.log(quiz_question_option.user_id + quiz_question_option.quiz_code  +  quiz_question_option.statement  + quiz_question_option.description);

    if (!quiz_question_option.question_id || !quiz_question_option.options) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating quiz_question_option');
        var result = await quiz_question_options.create(quiz_question_option);
        //console.log('quiz_question_option Create result ', result);
        res.status(201).json({
            quiz_question_option: result
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
    const result = await quiz_question_options.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "quiz_question_option not found"
        });
        return;
    }

    res.status('200').json({
        message: "quiz_question_option Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var quiz_question_option = {
        question_id: req.body.question_id,
        options: req.body.options,
    };
   
    console.log('body', req.body);
   
    if (!quiz_question_option.question_id || !quiz_question_option.options) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await quiz_question_options.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find quiz_question_option'
        });
        return;
    }

 try {
        const result = await quiz_question_options.update({
            question_id: req.body.question_id,
            options: req.body.options,
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
            messsage: "quiz_question_option Updated"
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
    const result = quiz_question_options.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'quiz_question_options': data,
        });
    });
    return;
    
};