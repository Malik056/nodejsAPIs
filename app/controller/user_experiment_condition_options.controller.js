const db = require("../models");
const user_experiment_condition_options = db.user_experiment_condition_options;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_experiment_condition_options.findAll().then(data => {
        res.json({
            'user_experiment_condition_options': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_experiment_condition_option = {
        user_experiment_question_id: req.body.user_experiment_question_id,
        option: req.body.option,
        is_selected: req.body.is_selected,
    };
    console.log('body', req.body);
    
    if (!user_experiment_condition_option.user_experiment_question_id || !user_experiment_condition_option.option || !user_experiment_condition_option.is_selected) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_experiment_condition_option');
        var result = await user_experiment_condition_options.create(user_experiment_condition_option);
        res.status(201).json({
            user_experiment_condition_option: result
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
    const result = await user_experiment_condition_options.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_experiment_condition_option not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_experiment_condition_option Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_experiment_condition_option = {
        user_experiment_question_id: req.body.user_experiment_question_id,
        option: req.body.option,
        is_selected: req.body.is_selected,
    };
    console.log('body', req.body);
    
    if (!user_experiment_condition_option.user_experiment_question_id || !user_experiment_condition_option.option || !user_experiment_condition_option.is_selected) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_experiment_condition_options.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_experiment_condition_option'
        });
        return;
    }

 try {
        const result = await user_experiment_condition_options.update({
            user_experiment_question_id: req.body.user_experiment_question_id,
            option: req.body.option,
            is_selected: req.body.is_selected,
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
            messsage: "user_experiment_condition_option Updated"
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
    const result = user_experiment_condition_options.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_experiment_condition_options': data,
        });
    });
    return;
    
};