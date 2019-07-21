const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'root',
    password: 'admin@123',
    database: 'vtracker'
})



// module.exports = mysql.createPool({
//     connectionLimit : 100,
//     host : 'localhost',
//     user :  'tuhin',
//     password: 'tuhin@4321',
//     database: 'vms'
// })

