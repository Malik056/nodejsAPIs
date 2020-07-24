const express = require('express');
const router = express.Router();
const db = require('../controller/operation_scenario_conditions_msca.controller');

router.post('/', db.create);

router.put('/', db.update);

router.delete('/', db.delete);

router.get('/', db.findAll);

router.get('/byid', db.findOne);

router.get((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

module.exports = router;