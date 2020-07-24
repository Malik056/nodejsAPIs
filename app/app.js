const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users.route');
const documentsRoute = require('./routes/documents.route');
const user_documentsRoute = require('./routes/user_documents.route');
const quizzesRoute = require('./routes/quizzes.route');
const quiz_questionsRoute = require('./routes/quiz_questions.route');
const quiz_question_optionsRoute = require('./routes/quiz_question_options.route');
const quiz_question_multi_select_correct_answersRoute = require('./routes/quiz_question_multi_select_correct_answers.route');
const user_quizzesRoute = require('./routes/user_quizzes.route');
const user_quiz_questionsRoute = require('./routes/user_quiz_questions.route');
const user_quiz_question_optionsRoute = require('./routes/user_quiz_question_options.route');
const user_quiz_question_multi_select_correct_answersRoute = require('./routes/user_quiz_question_multi_select_correct_answers.route');
const operationsRoute = require('./routes/operations.route');
const user_operationsRoute = require('./routes/user_operations.route');
const user_operation_critical_pointsRoute = require('./routes/user_operation_critical_points.route');
const user_operation_scenariosRoute = require('./routes/user_operation_scenarios.route');
const user_operation_scenario_conditionsRoute = require('./routes/user_operation_scenario_conditions.route');
const user_operation_scenario_conditions_mscaRoute = require('./routes/user_operation_scenario_conditions_msca.route');
const user_operation_scenario_condition_optionsRoute = require('./routes/user_operation_scenario_condition_options.route');
const operation_critical_pointsRoute = require('./routes/operation_critical_points.route');
const operation_scenariosRoute = require('./routes/operation_scenarios.route');
const operation_scenario_conditionsRoute = require('./routes/operation_scenario_conditions.route');
const operation_scenario_condition_optionsRoute = require('./routes/operation_scenario_condition_options.route');
const operation_scenario_conditions_mscaRoute = require('./routes/operation_scenario_conditions_msca.route');
const experimentsRoute = require('./routes/experiments.route');
const experiment_samplesRoute = require('./routes/experiment_samples.route');
const experiment_parametersRoute = require('./routes/experiment_parameters.route');
const experiment_conditionsRoute = require('./routes/experiment_conditions.route');
const experiment_condition_optionsRoute = require('./routes/experiment_condition_options.route');
const user_experimentsRoute = require('./routes/user_experiments.route');
const user_experiment_parametersRoute = require('./routes/user_experiment_parameters.route');
const user_experiment_conditionsRoute = require('./routes/user_experiment_conditions.route');
const user_experiment_condition_optionsRoute = require('./routes/user_experiment_condition_options.route');


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

app.use("/documents", documentsRoute);

app.use("/user_documents", user_documentsRoute);

app.use("/quizzes", quizzesRoute);

app.use("/quiz_questions", quiz_questionsRoute);

app.use("/quiz_question_options", quiz_question_optionsRoute);

app.use("/quiz_question_multi_select_correct_answers", quiz_question_multi_select_correct_answersRoute);

app.use("/user_quizzes", user_quizzesRoute);

app.use("/user_quiz_questions", user_quiz_questionsRoute);

app.use("/user_quiz_question_options", user_quiz_question_optionsRoute);

app.use("/user_quiz_question_multi_select_correct_answers", user_quiz_question_multi_select_correct_answersRoute);

app.use("/user_operations", user_operationsRoute);

app.use("/operations", operationsRoute);

app.use("/user_operation_critical_points", user_operation_critical_pointsRoute);

app.use("/user_operation_scenarios", user_operation_scenariosRoute);

app.use("/user_operation_scenario_conditions", user_operation_scenario_conditionsRoute);

app.use("/user_operation_scenario_conditions_msca", user_operation_scenario_conditions_mscaRoute);

app.use("/user_operation_scenario_condition_options", user_operation_scenario_condition_optionsRoute);

app.use("/operation_critical_points", operation_critical_pointsRoute);

app.use("/operation_scenarios", operation_scenariosRoute);

app.use("/operation_scenario_conditions", operation_scenario_conditionsRoute);

app.use("/operation_scenario_condition_options", operation_scenario_condition_optionsRoute);

app.use("/operation_scenario_conditions_msca", operation_scenario_conditions_mscaRoute);

app.use("/experiments", experimentsRoute);

app.use("/experiment_samples", experiment_samplesRoute);

app.use("/experiment_parameters", experiment_parametersRoute);

app.use("/experiment_conditions", experiment_conditionsRoute);

app.use("/experiment_condition_options", experiment_condition_optionsRoute);

app.use("/user_experiments", user_experimentsRoute);

app.use("/user_experiment_parameters", user_experiment_parametersRoute);

app.use("/user_experiment_conditions", user_experiment_conditionsRoute);

app.use("/user_experiment_condition_options", user_experiment_condition_optionsRoute);

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