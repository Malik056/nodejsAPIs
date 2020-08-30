const db = require("../models");
const api_keys = db.api_keys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.api_key) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    api_keys.create(res.body.api_key).then(data => {
        res.json({
            message: "Key Created",
            key: data
        });
    });
};

exports.checkValid = (apiKey) => {
    return new Promise((resolve, reject) => {
        const condition = apiKey ? {
            api_key: apiKey
        } : null;
        api_keys.findAll({
            where: condition
        }).then(data => {
            try {
                if (data.length <= 0) {
                    reject(false);
                }
                resolve(true);
            } catch (e) {
                console.log('erorr: ', e);
                reject(false);
            }

        });
    });
};