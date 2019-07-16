import { AST_DWLoop } from "terser";
import { ifError } from "assert";
import { isFunction } from "util";
import { S_IFBLK } from "constants";

// const mysql = require('mysql');


// // Database connection strings
// // const db_host       = "localhost";
// // const db_user       = "tuhin";
// // const db_pass       = "tuhin@4321"
// // const db_name       = "vms";
// // const db_port       = 3306;
// // const data_host     = "http://localhost/vTracker/webApp/";
// // const web_img_dir   = "public/images/";
// // const listen_to     = "localhost"

// const db_host = "localhost";
// const db_user = "root";
// const db_pass = "admin@123"
// const db_name = "vtracker";
// const db_port = 3036;
// const data_host = "http://localhost/vTracker/WebApp/";
// const listen_to = "localhost"

// // Mysql Connection
// const con = mysql.createConnection({
//     host        : db_host,
//     user        : db_user,
//     password    : db_pass,
//     database    : db_name
// });

// // Connecting to DB
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });





/**
 * Upload visitor Photo
 */
// app.post('/api/upload',upload.single('visitor_pic'),(req,res,next) =>{
//     // const img            = web_img_dir+"/"+req.file.filename;
//     // const visitor_id     = register_param.visitor_id;
//     // const upload_query   =  fn_upload_picture(visitor_pic,visitor_id)
//     // type                 = true
//     // sms                  = "success"
//     // if(upload_query){
//     //     builder.getresult(visitor_query,type,sms,function (result) {
//     //         //   if(error) { res.send(500, "Server Error"); return; }
//     //         if(result){
//     //             const respose = [{status: 0, message: "Invalid Request"}]
//     //             res.send(respose)
//     //         }
//     //         else{
//     //             const respose = [{status: 0, message: "Not found"}]
//     //             res.send(respose)
//     //         }
//     //     });
//     // }
// });




// function on database queries
/**
 *
 * @param error
 * @param response
 * @param fields
 */
function query_response(error,response,fields) {
    if(!!error){
        console.log("query error")
    }
    else{
        console.log(response.body);
    }
}


/**
 * Logout
 * @param userid
 * @returns {*}
 */
function fn_logout_query(userid){
    const users_id = userid;
    if(users_id.length < 1 ){
        return false;
    }
    else{
        return "DELETE from devices where user_id='"+users_id+"'";
    }
}






















function fn_upload_picture(visitor_pic,visitor_id){

    if(typeof visitor_pic == "Undefined"){
        return false
    }
    else if(visitor_pic.length < 1){
        return false;
    }
    if(typeof visitor_id == "undefined"){
        return false
    }
    else if (visitor_id < 1){
        return false
    }

    return "Update users set visitor_pic='"+visitor_pic+"' where id='"+visitor_id+"'" ;
}







/**
 * Saving Notifications to Database
 *
 * @param host_id
 * @param guard_id
 * @param sms
 */
function save_notfication(host_id,sms) {
    const query = "INSERT INTO notifications (notify,user_id) value('"+sms+"','"+host_id+"') ";
    const type = true
    console.log(query);
    builder.getresult(query,type,sms,function (result,extra) {
        if(result){
            console.log('notification saved')
        }
        else{
            console.log('unable to notification saved')
        }
    });
}


/*========================= Validation functions ========================*/

function login_validation() {

}
function logout_validation() {

}

function admin(){
    if (admin) {
        return "go";
    } else {
        return "dont go"
    }
}

const admin = () => admin ? "go" : "dont go";

const newOne = () => {
    const vtracker = "okkkkllllla";
}

 
