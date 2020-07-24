const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

exports.findAll = (req, res, next) => {
    users.findAll().then(data => {
        res.json({
            'users': data,
        });
    });
};

exports.create = async (req, res, next) => {
    console.log('createing user');
    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        _role: req.body._role,
        is_admin: req.body.is_admin,
        license_key: req.body.license_key,
    };
    
    console.log(req.body.first_name + req.body.last_name + req.body.email + req.body._role + req.body.is_admin + req.body.license_key + req.body.password);
    console.log(user.first_name + user.last_name + user.email + user._role + user.is_admin + user.license_key + req.body.password);
    const password = req.body.password;
    console.log('body', req.body);
    // console.log('req_params', req.get());
    console.log('req_params_f', req.get('first_name'));
    if (!user.first_name || !user.last_name || !user.email || !password || !user._role || !user.is_admin || !user.license_key) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }
    console.log('hashing password', password);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        res.status(500).json({
            message: 'Error while encrypting your password'
        });
        return;
    }
    user._password = hashedPassword;
    console.log('user', user);
    console.log('hash', hashedPassword);
    try {
        var result = await users.create(user);
        console.log('user Create reslt ', result);
        res.status(201).json(
            result.dataValues
        );
    } catch (e) {
        res.status(500).json({
            message: e
        });
        return;
    }
};

exports.updateUser = async (req, res, next) => {
    console.log('updating user');
    password = req.body.password;
    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        _role: req.body._role,
        is_admin: req.body.is_admin,
        license_key: req.body.license_key,
    };
    
    console.log(req.body.first_name + req.body.last_name + req.body.email + req.body._role + req.body.is_admin + req.body.license_key + req.body.password);
    console.log(user.first_name + user.last_name + user.email + user._role + user.is_admin + user.license_key + req.body.password);
    
    console.log('body', req.body);
    if (!user.first_name || !user.last_name || !user._role || !password || !user.is_admin || !user.license_key) {
        res.status(400).json({
            message: 'Invalid Parameters',
        });
        return;
    }
    const email = user.email;
    console.log(email);
    const userFromDB = await users.findOne({
        where: {
            email: email
        }
    });
    console.log('got user');
    if (!userFromDB) {
        res.status(404).json({
            message: 'Cannot find user'
        });
        return;
    }

    const valid = bcrypt.compareSync(password, userFromDB._password);

    if (!valid) {
        res.status(404).json({
            message: 'Invalid Password'
        });
        return;
    }
    try {
        const result = await users.update({
            first_name: user.first_name,
            last_name: user.last_name,
            role: user._role,
            is_admin: user.is_admin,
            license_key: user.license_key,
        }, {
            where: {
                email: user.email,
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
            messsage: "User Updated"
        });
    } catch (e) {
        res.status(500).json({
            message: 'error: ' + e
        });
        return;
    }

};

exports.delete = async (req, res, next) => {
    console.log('deleting user');

    const result = await users.destroy({
        where: {
            email: req.body.email
        }
    });
    if (result[0] <= 0) {
        res.status('400').json({
            message: "User not found"
        });
        return;
    }

    res.status('200').json({
        message: "User Deleted"
    });
    return;
};
exports.getuser = async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).body({
            message: 'No email provided'
        });
    }
    const user = await users.findOne({
        where: {
            email: email
        }
    }); 
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user._role,
            is_admin: user.is_admin,
            license_key: user.license_key,
        });
    return;
};

exports.authenticate = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400).json({
            message: 'invalid parameters',
        });
    }
    try {
        users.findAll({
            where: {
                email: email,
            }
        }).then(data => {
            if (data.length <= 0) {
                res.status(401).json({
                    message: "Inavalid Username or Passwrod"
                });
            } else {
                const hashedPassword = data[0]._password;
                if (bcrypt.compare(password, hashedPassword)) {
                    res.status(200).json({
                        id: data[0].id,
                        first_name: data[0].first_name,
                        last_name: data[0].last_name,
                        is_admin: data[0].is_admin,
                        email: data[0].email,
                        role: data[0]._role,
                        license_key: data[0].license_key
                    });
                } else {
                    res.status(401).body({
                        message: "email and password didn't match"
                    });
                }
            }
        });
    } catch (e) {
        res.status(204).json({
            message: 'no Content',
            error: 'Error: ' + e
        });
    }
    return;
};

