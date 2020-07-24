const db = require("../models");
const operation_critical_points = db.operation_critical_points;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operation_critical_points.findAll().then(data => {
        res.json({
            'operation_critical_points': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation_critical_point = {
        operation_id: req.body.operation_id,
        critical_point_title: req.body.critical_point_title,
    };
    console.log('body', req.body);
   
    if (!operation_critical_point.operation_id || !operation_critical_point.critical_point_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation_critical_point');
        var result = await operation_critical_points.create(operation_critical_point);
        //console.log('operation_critical_point Create result ', result);
        res.status(201).json({
            operation_critical_point: result
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
    const result = await operation_critical_points.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation_critical_point not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation_critical_point Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation_critical_point = {
        operation_id: req.body.operation_id,
        critical_point_title: req.body.critical_point_title,
    };
    console.log('body', req.body);
   
    if (!operation_critical_point.operation_id || !operation_critical_point.critical_point_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }


    const id = req.body.id;
    const docFromDB = await operation_critical_points.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation_critical_point'
        });
        return;
    }

 try {
        const result = await operation_critical_points.update({
            operation_id: req.body.operation_id,
            critical_point_title: req.body.critical_point_title,
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
            messsage: "operation_critical_point Updated"
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
    const result = operation_critical_points.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operation_critical_points': data,
        });
    });
    return;
    
};