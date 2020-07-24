const db = require("../models");
const user_experiment_conditions = db.user_experiment_conditions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_experiment_conditions.findAll().then(data => {
        res.json({
            'user_experiment_conditions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_experiment_condition = {
        user_experiment_id: req.body.user_experiment_id,
        user_experiment_condition_title: req.body.user_experiment_condition_title,
        user_experiment_condition_type: req.body.user_experiment_condition_type,
        is_yes: req.body.is_yes,
    };
    console.log('body', req.body);
    
    if (!user_experiment_condition.user_experiment_id || !user_experiment_condition.user_experiment_condition_title || !user_experiment_condition.user_experiment_condition_type || !user_experiment_condition.is_yes) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_experiment_condition');
        var result = await user_experiment_conditions.create(user_experiment_condition);
        res.status(201).json({
            user_experiment_condition: result
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
    const result = await user_experiment_conditions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_experiment_condition not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_experiment_condition Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_experiment_condition = {
        user_experiment_id: req.body.user_experiment_id,
        user_experiment_condition_title: req.body.user_experiment_condition_title,
        user_experiment_condition_type: req.body.user_experiment_condition_type,
        is_yes: req.body.is_yes,
    };
    console.log('body', req.body);
    
    if (!user_experiment_condition.user_experiment_id || !user_experiment_condition.user_experiment_condition_title || !user_experiment_condition.user_experiment_condition_type || !user_experiment_condition.is_yes) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_experiment_conditions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_experiment_condition'
        });
        return;
    }

 try {
        const result = await user_experiment_conditions.update({
            user_experiment_id: req.body.user_experiment_id,
            user_experiment_condition_title: req.body.user_experiment_condition_title,
            user_experiment_condition_type: req.body.user_experiment_condition_type,
            is_yes: req.body.is_yes,
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
            messsage: "user_experiment_condition Updated"
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
    const result = user_experiment_conditions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_experiment_conditions': data,
        });
    });
    return;
    
};