const db = require("../models");
const experiments = db.experiments;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    experiments.findAll().then(data => {
        res.json({
            'experiments': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var experiment = {
        experiment_title: req.body.experiment_title,
        user_id: req.body.user_id,
    };
    console.log('body', req.body);
    
    if (!experiment.experiment_title || !experiment.user_id) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating experiment');
        var result = await experiments.create(experiment);
        res.status(201).json({
            experiment: result
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
    const result = await experiments.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "experiment not found"
        });
        return;
    }

    res.status('200').json({
        message: "experiment Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var experiment = {
        experiment_title: req.body.experiment_title,
        user_id: req.body.user_id,
    };
    console.log('body', req.body);
    
    if (!experiment.experiment_title || !experiment.user_id) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await experiments.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find experiment'
        });
        return;
    }

 try {
        const result = await experiments.update({
            experiment_title: req.body.experiment_title,
            user_id: req.body.user_id,
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
            messsage: "experiment Updated"
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
    const result = experiments.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'experiments': data,
        });
    });
    return;
    
};