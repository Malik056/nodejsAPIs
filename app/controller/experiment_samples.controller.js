const db = require("../models");
const experiment_samples = db.experiment_samples;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    experiment_samples.findAll().then(data => {
        res.json({
            'experiment_samples': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var experiment_sample = {
        experiment_id: req.body.experiment_id,
        sample_name: req.body.sample_name,
    };
    console.log('body', req.body);
    
    if (!experiment_sample.experiment_id || !experiment_sample.sample_name) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating experiment_sample');
        var result = await experiment_samples.create(experiment_sample);
        res.status(201).json({
            experiment_sample: result
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
    const result = await experiment_samples.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "experiment_sample not found"
        });
        return;
    }

    res.status('200').json({
        message: "experiment_sample Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var experiment_sample = {
        experiment_id: req.body.experiment_id,
        sample_name: req.body.sample_name,
    };
    console.log('body', req.body);
    
    if (!experiment_sample.experiment_id || !experiment_sample.sample_name) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await experiment_samples.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find experiment_sample'
        });
        return;
    }

 try {
        const result = await experiment_samples.update({
            experiment_id: req.body.experiment_id,
            sample_name: req.body.sample_name,
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
            messsage: "experiment_sample Updated"
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
    const result = experiment_samples.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'experiment_samples': data,
        });
    });
    return;
    
};