var db = require('../config/database');

const data_host = "http://192.168.3.213/vTracker/webApp/";
const web_img_dir   = "public/images/";;

const builder = {
    getresult: function (query,type,sms,callback) {
        if(!query){
            const response = [{ status: 0, message: "Error" }]
            return callback(response)
        }else {
            db.query(query, (error, rows, fileds) => {
                if (error) console.log('error', error);
                return callback(rows, fileds)
            });
        }
    }
}

exports.builder = builder;
exports.data_host = data_host;
exports.web_img_dir = web_img_dir;