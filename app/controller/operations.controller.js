const db = require("../models");
const operations = db.operations;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    operations.findAll().then(data => {
        res.json({
            'operations': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var operation = {
        user_id: req.body.user_id,
        operations_title: req.body.operations_title,
    };
    console.log('body', req.body);
   
    console.log(operation.user_id + operation.operations_title);

    if (!operation.user_id || !operation.operations_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating operation');
        var result = await operations.create(operation);
        //console.log('operation Create result ', result);
        res.status(201).json({
            operation: result
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
    const result = await operations.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "operation not found"
        });
        return;
    }

    res.status('200').json({
        message: "operation Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var operation = {
        user_id: req.body.user_id,
        operations_title: req.body.operations_title,
    };
    console.log('body', req.body);
   
    console.log(operation.user_id + operation.operations_title);

    if (!operation.user_id || !operation.operations_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await operations.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find operation'
        });
        return;
    }

 try {
        const result = await operations.update({
            user_id: req.body.user_id,
            operations_title: req.body.operations_title,
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
            messsage: "operation Updated"
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
    const result = operations.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'operations': data,
        });
    });
    return;
    
};