const db = require("../models");
const experiment_conditions = db.experiment_conditions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    experiment_conditions.findAll().then(data => {
        res.json({
            'experiment_conditions': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var experiment_condition = {
        experiment_id: req.body.experiment_id,
        experiment_conditions_title: req.body.experiment_conditions_title,
        experiment_conditions_type: req.body.experiment_conditions_type,
    };
    console.log('body', req.body);
    
    if (!experiment_condition.experiment_id || !experiment_condition.experiment_conditions_title || !experiment_condition.experiment_conditions_type) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating experiment_condition');
        var result = await experiment_conditions.create(experiment_condition);
        res.status(201).json({
            experiment_condition: result
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
    const result = await experiment_conditions.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "experiment_condition not found"
        });
        return;
    }

    res.status('200').json({
        message: "experiment_condition Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var experiment_condition = {
        experiment_id: req.body.experiment_id,
        experiment_conditions_title: req.body.experiment_conditions_title,
        experiment_conditions_type: req.body.experiment_conditions_type,
    };
    console.log('body', req.body);
    
    if (!experiment_condition.experiment_id || !experiment_condition.experiment_conditions_title || !experiment_condition.experiment_conditions_type) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await experiment_conditions.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find experiment_condition'
        });
        return;
    }

 try {
        const result = await experiment_conditions.update({
            experiment_id: req.body.experiment_id,
            experiment_conditions_title: req.body.experiment_conditions_title,
            experiment_conditions_type: req.body.experiment_conditions_type,
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
            messsage: "experiment_condition Updated"
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
    const result = experiment_conditions.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'experiment_conditions': data,
        });
    });
    return;
    
};