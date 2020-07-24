const db = require("../models");
const user_quiz_question_options = db.user_quiz_question_options;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_quiz_question_options.findAll().then(data => {
        res.json({
            'user_quiz_question_options': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_quiz_question_option = {
        user_quiz_question_id: req.body.user_quiz_question_id,
        options: req.body.options,
        is_selected: req.body.is_selected,
    };
    console.log('body', req.body);
   
    //console.log(user_quiz_question_option.user_id + user_quiz_question_option.quiz_id  +  user_quiz_question_option.statement  + user_quiz_question_option.description);

    if (!user_quiz_question_option.user_quiz_question_id || !user_quiz_question_option.options || !user_quiz_question_option.is_selected) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_quiz_question_option');
        var result = await user_quiz_question_options.create(user_quiz_question_option);
        //console.log('user_quiz_question_option Create result ', result);
        res.status(201).json({
            user_quiz_question_option: result
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
    const result = await user_quiz_question_options.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_quiz_question_option not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_quiz_question_option Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_quiz_question_option = {
        user_quiz_question_id: req.body.user_quiz_question_id,
        options: req.body.options,
        is_selected: req.body.is_selected,
    };
    console.log('body', req.body);
   
    //console.log(user_quiz_question_option.user_id + user_quiz_question_option.quiz_id  +  user_quiz_question_option.statement  + user_quiz_question_option.description);

    if (!user_quiz_question_option.user_quiz_question_id || !user_quiz_question_option.options || !user_quiz_question_option.is_selected) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_quiz_question_options.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_quiz_question_option'
        });
        return;
    }

 try {
        const result = await user_quiz_question_options.update({
            user_quiz_question_id: req.body.user_quiz_question_id,
            options: req.body.options,
            is_selected: req.body.is_selected,
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
            messsage: "user_quiz_question_option Updated"
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
    const result = user_quiz_question_options.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_quiz_question_options': data,
        });
    });
    return;
    
};