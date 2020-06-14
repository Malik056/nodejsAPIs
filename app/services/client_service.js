const mysql = require('mysql');

let checkApiKey = (clientApiKey) => {
    console.log(clientApiKey);
    return new Promise((resolve, reject) => {
        // console.log('somethig');
        // resolve(true);
        // database.query.call('SELECT * FROM api_keys where api_key = ' + clientApiKey, (error, result) => {
        //     console.log("this is result");
        //     console.log(result);

        //     if(err) throw error;
        //     resolve(true);
        // });
        const connection = mysql.createConnection({
            server: 'localhost',
            user: 'root',
            password: '123456',
            database: 'mydb',
        });

        connection.connect((error) => {
            if (error) throw error;
            console.log('Database Connected');
        });


        connection.query('SELECT * FROM api_keys where api_key = \'' + clientApiKey + '\'', (error, result, fields) => {
            console.log("this is result");
            console.log(result);

            if (error) throw error;
            if (result.length <= 0) reject(false);
            resolve(true);
        });

        connection.end();


    });
};

module.exports.checkApiKey = checkApiKey;