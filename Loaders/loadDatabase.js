const mysql = require('mysql');

module.exports = async () => {

    let db = await mysql.createConnection({
        host: "cloudhive.fr",
        user: 'u191_9s4vWm2PVn',
        password: '8Cbg6@O4urh^mqDYOJ0YJ@hm',
        database: 's191_XIFI'
})
    return db;
}