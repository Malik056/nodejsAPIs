const db = require("../models");
const user_operations = db.user_operations;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    user_operations.findAll().then(data => {
        res.json({
            'user_operations': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var user_operation = {
        user_id: req.body.user_id,
        operation_id: req.body.operation_id,
        operation_title: req.body.operation_title,
    };
    console.log('body', req.body);
   
    console.log(user_operation.user_id + user_operation.operation_id  +  user_operation.operation_title);

    if (!user_operation.user_id || !user_operation.operation_id || !user_operation.operation_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating user_operation');
        var result = await user_operations.create(user_operation);
        //console.log('user_operation Create result ', result);
        res.status(201).json({
            user_operation: result
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
    const result = await user_operations.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "user_operation not found"
        });
        return;
    }

    res.status('200').json({
        message: "user_operation Deleted"
    });


};

exports.update = async (req, res, next) => {

    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    var user_operation = {
        user_id: req.body.user_id,
        operation_id: req.body.operation_id,
        operation_title: req.body.operation_title,
    };
    console.log('body', req.body);
   
    console.log(user_operation.user_id + user_operation.operation_id  +  user_operation.operation_title);

    if (!user_operation.user_id || !user_operation.operation_id || !user_operation.operation_title) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await user_operations.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_operation'
        });
        return;
    }

 try {
        const result = await user_operations.update({
            user_id: req.body.user_id,
            operation_id: req.body.operation_id,
            operation_title: req.body.operation_title,
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
            messsage: "user_operation Updated"
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
    const result = user_operations.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_operations': data,
        });
    });
    return;
    
};