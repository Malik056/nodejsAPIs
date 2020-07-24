const db = require("../models");
const user_experiments = db.user_experiments;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_experiments.findAll().then(data => {
        res.json({
            'user_experiments': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_experiment = {
        user_id: req.body.user_id,
        experiment_id: req.body.experiment_id,
        experiment_title: req.body.experiment_title,
        experiment_sameple: req.body.experiment_sameple,
        answer: req.body.answer,
        status: req.body.status,
        feedback: req.body.feedback,
    };
    console.log('body', req.body);
    
    if (!user_experiment.user_id || !user_experiment.experiment_id || !user_experiment.experiment_title || !user_experiment.experiment_sameple || !user_experiment.answer || !user_experiment.status || !user_experiment.feedback) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_experiment');
        var result = await user_experiments.create(user_experiment);
        res.status(201).json({
            user_experiment: result
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
    const result = await user_experiments.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_experiment not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_experiment Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_experiment = {
        user_id: req.body.user_id,
        experiment_id: req.body.experiment_id,
        experiment_title: req.body.experiment_title,
        experiment_sameple: req.body.experiment_sameple,
        answer: req.body.answer,
        status: req.body.status,
        feedback: req.body.feedback,
    };
    console.log('body', req.body);
    
    if (!user_experiment.user_id || !user_experiment.experiment_id || !user_experiment.experiment_title || !user_experiment.experiment_sameple || !user_experiment.answer || !user_experiment.status || !user_experiment.feedback) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_experiments.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_experiment'
        });
        return;
    }

 try {
        const result = await user_experiments.update({
            user_id: req.body.user_id,
            experiment_id: req.body.experiment_id,
            experiment_title: req.body.experiment_title,
            experiment_sameple: req.body.experiment_sameple,
            answer: req.body.answer,
            status: req.body.status,
            feedback: req.body.feedback,
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
            messsage: "user_experiment Updated"
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
    const result = user_experiments.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_experiments': data,
        });
    });
    return;
    
};