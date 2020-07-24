const db = require("../models");
const operation_scenario_conditions = db.operation_scenario_conditions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operation_scenario_conditions.findAll().then(data => {
        res.json({
            'operation_scenario_conditions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation_scenario_condition = {
        operation_scenario_id: req.body.operation_scenario_id,
        scenario_title: req.body.scenario_title,
        scenario_type: req.body.scenario_type,
        is_yes: req.body.is_yes,
        correct_answer: req.body.correct_answer,
    };
    console.log('body', req.body);

    if (!operation_scenario_condition.operation_scenario_id || !operation_scenario_condition.scenario_title || !operation_scenario_condition.scenario_type || !operation_scenario_condition.is_yes || !operation_scenario_condition.correct_answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation_scenario_condition');
        var result = await operation_scenario_conditions.create(operation_scenario_condition);
        //console.log('operation_scenario_condition Create result ', result);
        res.status(201).json({
            operation_scenario_condition: result
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
    const result = await operation_scenario_conditions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation_scenario_condition not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation_scenario_condition Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation_scenario_condition = {
        operation_scenario_id: req.body.operation_scenario_id,
        scenario_title: req.body.scenario_title,
        scenario_type: req.body.scenario_type,
        is_yes: req.body.is_yes,
        correct_answer: req.body.correct_answer,
    };
    console.log('body', req.body);

    if (!operation_scenario_condition.operation_scenario_id || !operation_scenario_condition.scenario_title || !operation_scenario_condition.scenario_type || !operation_scenario_condition.is_yes || !operation_scenario_condition.correct_answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await operation_scenario_conditions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation_scenario_condition'
        });
        return;
    }

 try {
        const result = await operation_scenario_conditions.update({
            operation_scenario_id: req.body.operation_scenario_id,
            scenario_title: req.body.scenario_title,
            scenario_type: req.body.scenario_type,
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
            messsage: "operation_scenario_condition Updated"
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
    const result = operation_scenario_conditions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operation_scenario_conditions': data,
        });
    });
    return;
    
};