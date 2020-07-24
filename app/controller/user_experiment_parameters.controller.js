const db = require("../models");
const user_experiment_parameters = db.user_experiment_parameters;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_experiment_parameters.findAll().then(data => {
        res.json({
            'user_experiment_parameters': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_experiment_parameter = {
        user_experiment_id: req.body.user_experiment_id,
        name: req.body.name,
        max_range: req.body.max_range,
        min_range: req.body.min_range,
        answer: req.body.answer,
    };
    console.log('body', req.body);
    
    if (!user_experiment_parameter.user_experiment_id || !user_experiment_parameter.name || !user_experiment_parameter.max_range || !user_experiment_parameter.min_range || !user_experiment_parameter.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_experiment_parameter');
        var result = await user_experiment_parameters.create(user_experiment_parameter);
        res.status(201).json({
            user_experiment_parameter: result
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
    const result = await user_experiment_parameters.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_experiment_parameter not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_experiment_parameter Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_experiment_parameter = {
        user_experiment_id: req.body.user_experiment_id,
        name: req.body.name,
        max_range: req.body.max_range,
        min_range: req.body.min_range,
        answer: req.body.answer,
    };
    console.log('body', req.body);
    
    if (!user_experiment_parameter.user_experiment_id || !user_experiment_parameter.name || !user_experiment_parameter.max_range || !user_experiment_parameter.min_range || !user_experiment_parameter.answer) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_experiment_parameters.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_experiment_parameter'
        });
        return;
    }

 try {
        const result = await user_experiment_parameters.update({
            user_experiment_id: req.body.user_experiment_id,
            name: req.body.name,
            max_range: req.body.max_range,
            min_range: req.body.min_range,
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
            messsage: "user_experiment_parameter Updated"
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
    const result = user_experiment_parameters.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_experiment_parameters': data,
        });
    });
    return;
    
};