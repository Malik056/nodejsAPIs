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

db.users.hasMany(db.documents, {
    foreignKey: {
        name: 'user_id',
        onDelete: 'CASCADE'
      }
});


module.exports = db;