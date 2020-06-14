const http = require('http');
const app = require('./app/app');
const mysql = require('mysql');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// const connection = mysql.createConnection({
//     server: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'mydb',
// });
const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log("Drop and re-sync db.");
// });


server.listen(port);