const db = require("../models");
const user_documents = db.user_documents;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = async (req, res, next) => {
    user_documents.findAll().then(data => {
        res.json({
            'user_documents': data,
        });
    });
};

exports.create = async (req, res, next) => {
    console.log('creating Document');
    var user_document = {
        _name: req.body._name,
        submitted_to: req.body.submitted_to,
        submitted_by: req.body.submitted_by,
        _type: req.body._type,
        file_url: req.body.file_url,
    };
    console.log('body', req.body);
    if (!user_document._name || !user_document.submitted_to || !user_document.submitted_by || !user_document._type || !user_document.file_url) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }
    if(user_document.submitted_to == user_document.submitted_by)
    {
        res.status(400).json({
            message: 'submitted_to and submitted_by cannot be same',
        });
        return;
    }
    try {
        var result = await user_documents.create(user_document);
        console.log('document Created');
        res.status(201).json({
            user_document: result
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
    const result = await user_documents.destroy({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "User_Document not found"
        });
        return;
    }

    res.status('200').json({
        message: "User_Document Deleted"
    });


};

exports.update = async (req, res, next) => {

    var document = {
        id: req.body.id,
        submitted_by: req.body.submitted_by,
        submitted_to: req.body.submitted_to,
        _name: req.body._name,
        _type: req.body._type,
        file_url: req.body.file_url
    };
    
    if (!document.id || !document._name || !document.submitted_by || !document.submitted_to || !document._type || !document.file_url) {
        return responses.sendInvalidParameters(res);
    }
    const id = document.id;
    const docFromDB = await user_documents.findOne({
        where: {
            id: document.id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find user_document'
        });
        return;
    }
 try {
        const result = await user_documents.update({
            _name: document._name,
            submitted_to: document.submitted_to,
            submitted_by: document.submitted_by,
            _type: document._type,
            file_url: document.file_url,
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
            messsage: "User_Document Updated"
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
    const result = user_documents.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'user_documents': data,
        });
    });
    return;
    
};