const db = require("../models");
const operation_scenario_conditions_msca = db.operation_scenario_conditions_msca;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operation_scenario_conditions_msca.findAll().then(data => {
        res.json({
            'operation_scenario_conditions_msca': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation_scenario_conditions_multi_select_correct_answer = {
        operation_scenario_condition_id: req.body.operation_scenario_condition_id,
        answer: req.body.answer,
    };
    console.log('body', req.body);

    if (!operation_scenario_conditions_multi_select_correct_answer.operation_scenario_condition_id || !operation_scenario_conditions_multi_select_correct_answer.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation_scenario_conditions_multi_select_correct_answer');
        var result = await operation_scenario_conditions_msca.create(operation_scenario_conditions_multi_select_correct_answer);
        //console.log('operation_scenario_conditions_multi_select_correct_answer Create result ', result);
        res.status(201).json({
            operation_scenario_conditions_multi_select_correct_answer: result
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
    const result = await operation_scenario_conditions_msca.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation_scenario_conditions_multi_select_correct_answer not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation_scenario_conditions_multi_select_correct_answer Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation_scenario_conditions_multi_select_correct_answer = {
        operation_scenario_condition_id: req.body.operation_scenario_condition_id,
        answer: req.body.answer,
    };
    console.log('body', req.body);

    if (!operation_scenario_conditions_multi_select_correct_answer.operation_scenario_condition_id || !operation_scenario_conditions_multi_select_correct_answer.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await operation_scenario_conditions_msca.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation_scenario_conditions_multi_select_correct_answer'
        });
        return;
    }

 try {
        const result = await operation_scenario_conditions_msca.update({
            operation_scenario_condition_id: req.body.operation_scenario_condition_id,
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
            messsage: "operation_scenario_conditions_multi_select_correct_answer Updated"
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
    const result = operation_scenario_conditions_msca.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operation_scenario_conditions_msca': data,
        });
    });
    return;
    
};