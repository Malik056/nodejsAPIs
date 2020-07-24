const db = require("../models");
const experiment_condition_options = db.experiment_condition_options;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    experiment_condition_options.findAll().then(data => {
        res.json({
            'experiment_condition_options': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var experiment_condition_option = {
        experiment_condition_id: req.body.experiment_condition_id,
        options: req.body.options,
    };
    console.log('body', req.body);
    
    if (!experiment_condition_option.experiment_condition_id || !experiment_condition_option.options ) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating experiment_condition_option');
        var result = await experiment_condition_options.create(experiment_condition_option);
        res.status(201).json({
            experiment_condition_option: result
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
    const result = await experiment_condition_options.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "experiment_condition_option not found"
        });
        return;
    }

    res.status('200').json({
        message: "experiment_condition_option Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var experiment_condition_option = {
        experiment_condition_id: req.body.experiment_condition_id,
        options: req.body.options,
    };
    console.log('body', req.body);
    
    if (!experiment_condition_option.experiment_condition_id || !experiment_condition_option.options ) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await experiment_condition_options.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find experiment_condition_option'
        });
        return;
    }

 try {
        const result = await experiment_condition_options.update({
            experiment_condition_id: req.body.experiment_condition_id,
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
            messsage: "experiment_condition_option Updated"
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
    const result = experiment_condition_options.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'experiment_condition_options': data,
        });
    });
    return;
    
};