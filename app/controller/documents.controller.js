const db = require("../models");
const documents = db.documents;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const responses = require('./response.utils');

exports.findAll = (req, res, next) => {
    var val = 0;
    documents.findAll().then(data => {
        res.json({
            'documents': data,
        });
    });
    return;
};

exports.create = async (req, res, next) => {
    var document = {
        _name: req.body._name,
        user_id: req.body.user_id,
        _type: req.body._type,
        file_url: req.body.file_url,
    };
    // const password = req.body.password;
    console.log('body', req.body);
    // console.log('req_params', req.get());
    console.log(document._name + document.user_id  +  document._type  + document.file_url);

    if (!document._name || !document.user_id || !document._type || !document.file_url) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    try {
        console.log('creating Document');
        var result = await documents.create(document);
        //console.log('document Create result ', result);
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
    const result = await documents.destroy({
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
    var document = {
        _name: req.body._name,
        user_id: req.body.user_id,
        _type: req.body._type,
        file_url: req.body.file_url,
    };

    if (!document._name || !document.user_id || !document._type || !document.file_url) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }

    const id = req.body.id;
    const docFromDB = await documents.findOne({
        where: {
            id: id
        }
    });
    
    if (!docFromDB) {
        res.status(404).json({
            message: 'Cannot find document'
        });
        return;
    }

 try {
        const result = await documents.update({
            _name: document._name,
            user_id: document.user_id,
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
            messsage: "Document Updated"
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
    const result = documents.findOne({
        where: {
            id: req.body.id,
        }
    }).then(data => {
        res.json({
            'documents': data,
        });
    });
    return;
    
};