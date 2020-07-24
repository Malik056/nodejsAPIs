const db = require("../models");
const user_operation_scenarios = db.user_operation_scenarios;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_operation_scenarios.findAll().then(data => {
        res.json({
            'user_operation_scenarios': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_operation_scenario = {
        user_operation_critical_points_id: req.body.user_operation_critical_points_id,
        scenario_title: req.body.scenario_title,
    };
    console.log('body', req.body);

    if (!user_operation_scenario.user_operation_critical_points_id || !user_operation_scenario.scenario_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_operation_scenario');
        var result = await user_operation_scenarios.create(user_operation_scenario);
        //console.log('user_operation_scenario Create result ', result);
        res.status(201).json({
            user_operation_scenario: result
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
    const result = await user_operation_scenarios.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_operation_scenario not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_operation_scenario Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_operation_scenario = {
        user_operation_critical_points_id: req.body.user_operation_critical_points_id,
        scenario_title: req.body.scenario_title,
    };
    console.log('body', req.body);

    if (!user_operation_scenario.user_operation_critical_points_id || !user_operation_scenario.scenario_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_operation_scenarios.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_operation_scenario'
        });
        return;
    }

 try {
        const result = await user_operation_scenarios.update({
            user_operation_critical_points_id: req.body.user_operation_critical_points_id,
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
            messsage: "user_operation_scenario Updated"
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
    const result = user_operation_scenarios.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_operation_scenarios': data,
        });
    });
    return;
    
};