const db = require("../models");
const documents = db.documents;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');


db.findAll((req, res, next) => {
    documents.findAll().then(data => {
        res.json({
            'documents': data,
        });
    });
});

exports.create = async (req, res, next) => {
    console.log('createing Document');
    var document = {
        _name: req.body.name,
        user_id: req.body.user_id,
        _type: req.body.type,
        file_url: req.body.file_url,
    };
    // const password = req.body.password;
    // console.log('body', req.body);
    // console.log('req_params', req.get());
    // console.log('req_params_f', req.get('first_name'));
    if (!document._name || !document.user_id || !document._type || document.file_url) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        var result = await documents.create();
        console.log('document Create result ', result);
        res.status(201).json({
            document: result
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
    const result = await documents.delete({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "Document not found"
        });
        return;
    }

    res.status('200').json({
        message: "Document Deleted"
    });


};

exports.update = async (req, res, next) => {
    if (!req.body.id) {
        res.status('400').json({
            message: "Invalid Id"
        });
        return;
    }
    const result = await documents.delete({
        where: {
            id: req.body.id
        },
    });

    if (result[0] <= 0) {
        res.status('400').json({
            message: "Document not found"
        });
        return;
    }

    res.status('200').json({
        message: "Document Deleted"
    });

};

exports.findOne = async (req, res, next) => {
    if (!req.body.id) {
        return responses.sendInvalidParameters(res);
    }
    const document = documents.findOne({
        where: {
            id: req.body.id,
        }
    });
    responses.sendResultOK(res, {
        name: document._name,
        type: document._type,
        user_id: document.user_id,
        file_url: document.file_url,
        
    });
};