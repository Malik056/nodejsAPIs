const db = require("../models");
const operation_scenario_condition_options = db.operation_scenario_condition_options;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operation_scenario_condition_options.findAll().then(data => {
        res.json({
            'operation_scenario_condition_options': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation_scenario_condition_option = {
        operation_scenario_condition_id: req.body.operation_scenario_condition_id,
        options: req.body.options,
    };
    console.log('body', req.body);
    console.log(operation_scenario_condition_option.operation_scenario_condition_id + ", " + operation_scenario_condition_option.options)
    if (!operation_scenario_condition_option.operation_scenario_condition_id || !operation_scenario_condition_option.options ) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation_scenario_condition_option');
        var result = await operation_scenario_condition_options.create(operation_scenario_condition_option);
        //console.log('operation_scenario_condition_option Create result ', result);
        res.status(201).json({
            operation_scenario_condition_option: result
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
    const result = await operation_scenario_condition_options.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation_scenario_condition_option not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation_scenario_condition_option Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation_scenario_condition_option = {
        operation_scenario_condition_id: req.body.operation_scenario_condition_id,
        options: req.body.options,
    };
    console.log('body', req.body);

    if (!operation_scenario_condition_option.operation_scenario_condition_id || !operation_scenario_condition_option.options ) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await operation_scenario_condition_options.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation_scenario_condition_option'
        });
        return;
    }

 try {
        const result = await operation_scenario_condition_options.update({
            operation_scenario_condition_id: req.body.operation_scenario_condition_id,
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
            messsage: "operation_scenario_condition_option Updated"
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
    const result = operation_scenario_condition_options.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operation_scenario_condition_options': data,
        });
    });
    return;
    
};