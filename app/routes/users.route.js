const express = require('express');
// const users = express();
const router = express.Router();
const db = require('../controller/users.controller');
// const bcrypt = require('bcrypt');


// (req, res, next) => {;
// ('SELECT * FROM USERS', (error, result, fields) => {
//     if (error) throw error;
//     console.log('result', result);
//     res.json({
//         users: result
//     });

// });
// });

router.post('/login', db.authenticate);

router.post('/', db.create);

router.put('/', db.updateUser);

router.delete('/', db.delete);

router.get('/', db.findAll);

router.get('/byemail', db.getuser);

router.get((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

module.exports = router;