const db = require("../models");
const experiment_parameters = db.experiment_parameters;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    experiment_parameters.findAll().then(data => {
        res.json({
            'experiment_parameters': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var experiment_parameter = {
        experiment_id: req.body.experiment_id,
        name: req.body.name,
        max_range: req.body.max_range,
        min_range: req.body.min_range,
    };
    console.log('body', req.body);
    
    if (!experiment_parameter.experiment_id || !experiment_parameter.name || !experiment_parameter.max_range || !experiment_parameter.min_range) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating experiment_parameter');
        var result = await experiment_parameters.create(experiment_parameter);
        res.status(201).json({
            experiment_parameter: result
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
    const result = await experiment_parameters.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "experiment_parameter not found"
        });
        return;
    }

    res.status('200').json({
        message: "experiment_parameter Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var experiment_parameter = {
        experiment_id: req.body.experiment_id,
        name: req.body.name,
        max_range: req.body.max_range,
        min_range: req.body.min_range,
    };
    console.log('body', req.body);
    
    if (!experiment_parameter.experiment_id || !experiment_parameter.name || !experiment_parameter.max_range || !experiment_parameter.min_range) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await experiment_parameters.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find experiment_parameter'
        });
        return;
    }

 try {
        const result = await experiment_parameters.update({
                experiment_id: req.body.experiment_id,
                name: req.body.name,
                max_range: req.body.max_range,
                min_range: req.body.min_range,
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
            messsage: "experiment_parameter Updated"
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
    const result = experiment_parameters.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'experiment_parameters': data,
        });
    });
    return;
    
};