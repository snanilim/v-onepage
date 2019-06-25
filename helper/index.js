const mysql = require('mysql');

const db_host = "localhost";
const db_user = "root";
const db_pass = "admin@123"
const db_name = "vtracker";
const db_port = 3036;
const data_host = "http://localhost/vTracker/WebApp/";
const listen_to = "localhost"

// Mysql Connection
const con = mysql.createConnection({
    host        : db_host,
    user        : db_user,
    password    : db_pass,
    database    : db_name
});

// Connecting to DB
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let builder = {
    getresult: function (query,type,sms,callback) {
        console.log("Builder Started...")
        console.log(query)
        if(!query){
            console.log('att')
            const response = [{ status: 0, message: "Error" }]
            console.log(response)
            return callback(response)
        }
        else {
            console.log('not')
            con.query(query, (error, rows, fileds) => {
                callback(rows, fileds)
            });
        }
    }
}

exports.builder = builder;
exports.data_host = data_host;