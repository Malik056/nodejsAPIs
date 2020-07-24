const db = require("../models");
const user_operation_scenario_conditions = db.user_operation_scenario_conditions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_operation_scenario_conditions.findAll().then(data => {
        res.json({
            'user_operation_scenario_conditions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_operation_scenario_condition = {
        user_operation_scenario_id: req.body.user_operation_scenario_id,
        scenario_title: req.body.scenario_title,
        scenario_type: req.body.scenario_type,
        is_yes: req.body.is_yes,
        answer: req.body.answer,
    };
    console.log('body', req.body);

    if (!user_operation_scenario_condition.user_operation_scenario_id || !user_operation_scenario_condition.scenario_title || !user_operation_scenario_condition.scenario_type || !user_operation_scenario_condition.is_yes || !user_operation_scenario_condition.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_operation_scenario_condition');
        var result = await user_operation_scenario_conditions.create(user_operation_scenario_condition);
        //console.log('user_operation_scenario_condition Create result ', result);
        res.status(201).json({
            user_operation_scenario_condition: result
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
    const result = await user_operation_scenario_conditions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_operation_scenario_condition not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_operation_scenario_condition Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_operation_scenario_condition = {
        user_operation_scenario_id: req.body.user_operation_scenario_id,
        scenario_title: req.body.scenario_title,
        scenario_type: req.body.scenario_type,
        is_yes: req.body.is_yes,
        answer: req.body.answer,
    };
    console.log('body', req.body);

    if (!user_operation_scenario_condition.user_operation_scenario_id || !user_operation_scenario_condition.scenario_title || !user_operation_scenario_condition.scenario_type || !user_operation_scenario_condition.is_yes || !user_operation_scenario_condition.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_operation_scenario_conditions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_operation_scenario_condition'
        });
        return;
    }

 try {
        const result = await user_operation_scenario_conditions.update({
            user_operation_scenario_id: req.body.user_operation_scenario_id,
            scenario_title: req.body.scenario_title,
            scenario_type: req.body.scenario_type,
            is_yes: req.body.is_yes,
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
            messsage: "user_operation_scenario_condition Updated"
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
    const result = user_operation_scenario_conditions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_operation_scenario_conditions': data,
        });
    });
    return;
    
};