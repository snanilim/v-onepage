var db = require('../config/database');

const data_host = "http://localhost/vTracker/WebApp/";

const builder = {
    getresult: function (query,type,sms,callback) {
        if(!query){
            const response = [{ status: 0, message: "Error" }]
            return callback(response)
        }else {
            db.query(query, (error, rows, fileds) => {
                return callback(rows, fileds)
            });
        }
    }
}

exports.builder = builder;
exports.data_host = data_host;