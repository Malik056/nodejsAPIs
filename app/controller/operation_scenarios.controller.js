const db = require("../models");
const operation_scenarios = db.operation_scenarios;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operation_scenarios.findAll().then(data => {
        res.json({
            'operation_scenarios': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation_scenario = {
        operation_critical_point_id: req.body.operation_critical_point_id,
        scenario_title: req.body.scenario_title,
    };
    console.log('body', req.body);

    if (!operation_scenario.operation_critical_point_id || !operation_scenario.scenario_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation_scenario');
        var result = await operation_scenarios.create(operation_scenario);
        //console.log('operation_scenario Create result ', result);
        res.status(201).json({
            operation_scenario: result
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
    const result = await operation_scenarios.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation_scenario not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation_scenario Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation_scenario = {
        operation_critical_point_id: req.body.operation_critical_point_id,
        scenario_title: req.body.scenario_title,
    };
    console.log('body', req.body);

    if (!operation_scenario.operation_critical_point_id || !operation_scenario.scenario_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await operation_scenarios.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation_scenario'
        });
        return;
    }

 try {
        const result = await operation_scenarios.update({
            operation_critical_point_id: req.body.operation_critical_point_id,
            scenario_title: req.body.scenario_title,
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
            messsage: "operation_scenario Updated"
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
    const result = operation_scenarios.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operation_scenarios': data,
        });
    });
    return;
    
};