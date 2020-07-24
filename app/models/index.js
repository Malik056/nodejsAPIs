const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model")(sequelize, Sequelize);
db.api_keys = require("./api_key.model")(sequelize, Sequelize);
db.documents = require('./documents.model')(sequelize, Sequelize);
db.user_documents = require('./user_documents.model')(sequelize, Sequelize);
db.quizzes = require('./quizzes.model')(sequelize, Sequelize);
db.quiz_questions = require('./quiz_questions.model')(sequelize, Sequelize);
db.quiz_question_multi_select_correct_answers = require('./quiz_question_multi_select_correct_answers.model')(sequelize, Sequelize);
db.quiz_question_options = require('./quiz_question_options.model')(sequelize, Sequelize);
db.user_quizzes = require('./user_quizzes.model')(sequelize, Sequelize);
db.user_quiz_questions = require('./user_quiz_questions.model')(sequelize, Sequelize);
db.user_quiz_question_options = require('./user_quiz_question_options.model')(sequelize, Sequelize);
db.user_quiz_question_multi_select_correct_answers = require('./user_quiz_question_multi_select_correct_answers.model')(sequelize, Sequelize);
db.operations = require('./operations.model')(sequelize, Sequelize);
db.user_operations = require('./user_operations.model')(sequelize, Sequelize);
db.user_operation_critical_points = require('./user_operation_critical_points.model')(sequelize, Sequelize);
db.user_operation_scenarios = require('./user_operation_scenarios.model')(sequelize, Sequelize);
db.user_operation_scenario_conditions = require('./user_operation_scenario_conditions.model')(sequelize, Sequelize);
db.user_operation_scenario_condition_options = require('./user_operation_scenario_condition_options.model')(sequelize, Sequelize);
db.user_operation_scenario_conditions_msca = require('./user_operation_scenario_conditions_msca.model')(sequelize, Sequelize);
db.operation_critical_points = require('./operation_critical_points.model')(sequelize, Sequelize);
db.operation_scenarios = require('./operation_scenarios.model')(sequelize, Sequelize);
db.operation_scenario_conditions = require('./operation_scenario_conditions.model')(sequelize, Sequelize);
db.operation_scenario_condition_options = require('./operation_scenario_condition_options.model')(sequelize, Sequelize);
db.operation_scenario_conditions_msca = require('./operation_scenario_conditions_msca.model')(sequelize, Sequelize);
db.experiments = require('./experiments.model')(sequelize, Sequelize);
db.experiment_samples = require('./experiment_samples.model')(sequelize, Sequelize);
db.experiment_parameters = require('./experiment_parameters.model')(sequelize, Sequelize);
db.experiment_conditions = require('./experiment_conditions.model')(sequelize, Sequelize);
db.experiment_condition_options = require('./experiment_condition_options.model')(sequelize, Sequelize);
db.user_experiments = require('./user_experiments.model')(sequelize, Sequelize);
db.user_experiment_parameters = require('./user_experiment_parameters.model')(sequelize, Sequelize);
db.user_experiment_conditions = require('./user_experiment_conditions.model')(sequelize, Sequelize);
db.user_experiment_condition_options = require('./user_experiment_condition_options.model')(sequelize, Sequelize);


db.user_experiment_conditions.hasMany(db.user_experiment_condition_options, {
    foreignKey: {
        name: 'user_experiment_question_id',
        onDelete: 'CASCADE'
      },
});

db.user_experiments.hasMany(db.user_experiment_conditions, {
    foreignKey: {
        name: 'user_experiment_id',
        onDelete: 'CASCADE'
      },
});

db.user_experiments.hasMany(db.user_experiment_parameters, {
    foreignKey: {
        name: 'user_experiment_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.user_experiments, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.experiments.hasMany(db.user_experiments, {
    foreignKey: {
        name: 'experiment_id',
        onDelete: 'CASCADE'
      },
});

db.experiment_conditions.hasMany(db.experiment_condition_options, {
    foreignKey: {
        name: 'experiment_condition_id',
        onDelete: 'CASCADE'
      },
});

db.experiments.hasMany(db.experiment_samples, {
    foreignKey: {
        name: 'experiment_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.experiments, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.operation_scenario_conditions.hasMany(db.operation_scenario_conditions_msca, {
    foreignKey: {
        name: 'operation_scenario_condition_id',
        onDelete: 'CASCADE'
      },
});

db.operation_scenario_conditions.hasMany(db.operation_scenario_condition_options, {
    foreignKey: {
        name: 'operation_scenario_condition_id',
        onDelete: 'CASCADE'
      },
});

db.operation_scenarios.hasMany(db.operation_scenario_conditions, {
    foreignKey: {
        name: 'operation_scenario_id',
        onDelete: 'CASCADE'
      },
});

db.operation_critical_points.hasMany(db.operation_scenarios, {
    foreignKey: {
        name: 'operation_critical_point_id',
        onDelete: 'CASCADE'
      },
});

db.operations.hasMany(db.operation_critical_points, {
    foreignKey: {
        name: 'operation_id',
        onDelete: 'CASCADE'
      },
});

db.user_operation_scenario_conditions.hasMany(db.user_operation_scenario_conditions_msca, {
    foreignKey: {
        name: 'user_operation_scenario_condition_id',
        onDelete: 'CASCADE'
      },
});

db.user_operation_scenario_conditions.hasMany(db.user_operation_scenario_condition_options, {
    foreignKey: {
        name: 'user_operation_scenario_condition_id',
        onDelete: 'CASCADE'
      },
});

db.user_operation_scenarios.hasMany(db.user_operation_scenario_conditions, {
    foreignKey: {
        name: 'user_operation_scenario_id',
        onDelete: 'CASCADE'
      },
});

db.user_operation_critical_points.hasMany(db.user_operation_scenarios, {
    foreignKey: {
        name: 'user_operation_critical_point_id',
        onDelete: 'CASCADE'
      },
});

db.user_operations.hasMany(db.user_operation_critical_points, {
    foreignKey: {
        name: 'user_operation_id',
        onDelete: 'CASCADE'
      },
});

db.operations.hasMany(db.user_operations, {
    foreignKey: {
        name: 'operation_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.user_operations, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.operations, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.user_quiz_questions.hasMany(db.user_quiz_question_multi_select_correct_answers, {
    foreignKey: {
        name: 'user_quiz_question_id',
        onDelete: 'CASCADE'
      },
});

db.user_quiz_questions.hasMany(db.user_quiz_question_options, {
    foreignKey: {
        name: 'user_quiz_question_id',
        onDelete: 'CASCADE'
      },
});

db.user_quizzes.hasMany(db.user_quiz_questions, {
    foreignKey: {
        name: 'user_quiz_id',
        onDelete: 'CASCADE'
      },
});

db.quizzes.hasMany(db.user_quizzes, {
    foreignKey: {
        name: 'quiz_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.user_quizzes, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.quiz_questions.hasMany(db.quiz_question_options, {
    foreignKey: {
        name: 'question_id',
        onDelete: 'CASCADE'
      },
});

db.quiz_questions.hasMany(db.quiz_question_multi_select_correct_answers, {
    foreignKey: {
        name: 'quiz_question_id',
        onDelete: 'CASCADE'
      },
});

db.quizzes.hasMany(db.quiz_questions, {
    foreignKey: {
        name: 'quiz_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.quizzes, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.user_documents, {
    foreignKey: {
        name: 'submitted_by',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.user_documents, {
    foreignKey: {
        name: 'submitted_to',
        onDelete: 'CASCADE'
      },
});

db.users.hasMany(db.documents, {
    foreignKey: {
        name: 'user_id'
      }
});



module.exports = db;