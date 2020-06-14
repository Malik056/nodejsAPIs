const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users.route');
const api_controller = require('./controller/api_keys.controller');
const db = require('../server').connection;
const checkApiKey = require('./services/client_service').checkApiKey;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, PATCH, POST, GET, DELETE');
        return res.status('200').json({});
    }
    next();
});

app.use(async (req, res, next) => {
    let clientApiKey = req.get('api_key');
    console.log(clientApiKey);
    // console.log('reqS', req);
    if (!clientApiKey) {
        return res.status(400).send({
            status: false,
            response: "Missing Api Key"
        });
    }
    try {
        let clientDetails = await api_controller.checkValid(clientApiKey);
        if (clientDetails) {
            next();
        }
    } catch (e) {
        console.log('%%%%%%%% error :', e);
        return res.status(400).send({
            status: false,
            response: "Invalid Api Key"
        });
    }
});

app.use("/users", usersRoute);

app.use((req, res, next) => {
    // console.log(req);
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;