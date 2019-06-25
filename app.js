const http              = require('http');
const express           = require('express');
const mysql             = require('mysql');

const crypto            = require('crypto');
const bodyParser        = require('body-parser')
const Multer            = require('multer');
const app               = express();
const jsonParser        = bodyParser.json()
const urlBodyParse      = bodyParser.urlencoded({extended: false})
const gcm               = require('node-gcm');
const fs                = require('fs')
const moment = require('moment-timezone');
moment().tz("Asia/Dhaka").format();
const storage           = Multer.diskStorage({
                                destination: function (req, file, cb) {
                                    cb(null, '../webApp/public/images/')
                                },
                                filename: function (req, file, cb) {
                                    const mime = file.mimetype;
                                    const extention = mime.split('/')
                                    cb(null, file.fieldname + '-' + Date.now()+"."+extention[1])
                                }
                            })
const upload            = Multer({  dest: '../webApp/public/images',storage: storage });
const mom =  new Date();
console.log(moment.tz(mom, "Asia/Dhaka").format().replace("T"," ").replace("+06:00",""));
// Database connection strings
// const db_host       = "localhost";
// const db_user       = "tuhin";
// const db_pass       = "tuhin@4321"
// const db_name       = "vms";
// const db_port       = 3306;
// const data_host     = "http://localhost/vTracker/webApp/";
// const web_img_dir   = "public/images/";
// const listen_to     = "localhost"

const db_host = "localhost";
const db_user = "root";
const db_pass = "admin@123"
const db_name = "vtracker";
const db_port = 3036;
const data_host = "http://localhost/vTracker/WebApp/";
const listen_to     = "localhost"

// Firebase Sender ID
const sender         = 'AAAAtycriZo:APA91bE0f-71mkbCtblLbz6WWMYmNaOVBgtvbFF1dhSW40IcjwKFSjVP79AwLKe_8wRYorRDyAWW3krAwOJ7Ekivu4-zXB7uqfqBqh7Zb2ZD7P0HxJZcEPxsUIQNqHvYdbH4PKYNdW9R';

// Firebase to Device ID
const deviceid       = 'eh31UyJ2tK8:APA91bEC9kl1HPwggBqHblkrtBzXK_2pkhLav1ZyF_yhtXF1LbD6-BE6gZHRQFSCzsZk-FPFluyJwK740OGKXyzoCdbDNDvjl15XPZrzeUc3FVqIa8Pi9Fbuvj-rSRPi0mAPASVG-WDf';

//Listen to Port
var server   = app.listen(4000, listen_to , function () {
    var host = server.address().address
    var port = server.address().port
    console.log("VTracker API is running", host, port)
});


/*===================== DB Query Builder =================*/


// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.json());

//API Root
app.get('/',(req,res)=>{res.send("Welcome to vTracker Api")});

/*=============== API Action ============*/

//User Login
const auth = require('./auth/auth')
app.post('/api/login', urlBodyParse, auth.login);

/**
 * Logout
 */
app.post('/api/logout', urlBodyParse, auth.logout);

/**
 * Add Device
 */
const device = require('./device/device')
app.post('/api/device', urlBodyParse, device.addDevice);


/**
 * User Profile
 */
const user = require('./user/user')
app.get('/api/user/profile/:employee_id', user.getProfile);

/**
 * User Notification
 */
app.get('/api/user/notification/:employee_id', user.getNotification);

/**
 * Reset Password
 */
app.post('/api/user/reset_password', urlBodyParse, user.resetPassword);


/**
 * Visitor Request
 */
const visitor = require('./visitor/visitor');
app.get('/api/visitor/:employee_id', visitor.getVisitor);

/**
 * Accept Visitor
 */
app.post('/api/visitor/accept', urlBodyParse, visitor.acceptVisitor);


/**
 * Reject Visitor
 */
app.post('/api/visitor/reject', urlBodyParse, visitor.rejectVisitor);

/**
 * Exit Operation
 */
app.post('/api/visitor/exit', urlBodyParse, visitor.exitOperation);


/**
 * Visitor Entry : Add Card Number
 */
app.post('/api/visitor/entry', urlBodyParse, visitor.visitorEntry);

/**
 * Visitor History
 */
app.get('/api/visitor/history/:employee_id', visitor.visitorHistory);


/**
 * Exist List
 */
app.get('/api/visitor/exist/:emp_id', visitor.existList);

/**
 * Pending List
 */
app.get('/api/visitor/pending/:emp_id', visitor.pendingList);

/**
 * Approved list
 */
app.get('/api/visitor/approved/:emp_id/:log_id', visitor.approvedList);


/**
 * visitor info by Mobile Number
 */
app.get('/api/visitor/info/:visitor_contact', visitor.visitorInfo);


/**
 * Host Search-----------------------------------------------------
 */
const host = require('./host/host');
app.get('/api/host/search/:employee_id/:branch_id', host.hostSearch);

/**
 * Host List---------------------------------------------
 */
app.get('/api/host/', host.hostList);

// Register Visitor
app.post('/api/visitor/register', upload.single('visitor_pic'), visitor.visitorRegister);

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




function nofity_accept_reject(log_id,guard_id,user_id,role,sms,ntype){
    let log_info = "select " +
        "uhost.full_name as host_name," +
        "visitor.full_name as visitor_name  from visit_logs  " +
        "inner join users as uhost ON uhost.id = visit_logs.user_id " +
        "inner join users as visitor ON visitor.id = visit_logs.visitor_id " +
        "where visit_logs.id = '"+log_id+"'"
    let type = true;

    builder.getresult(log_info,type,sms,function (result,extra) {
        if(result ){
            // res.send(result);
          const  custom_sms = "Mr "+result[0].visitor_name+" "+ntype+ " by "+result[0].host_name
            send_register_notification(guard_id,role,ntype,custom_sms)
        }
        else{
            console.log("error sending notofication to User:"+user_id)
        }
    });
}
function send_notification(user_id,sms,guard_id,role,log_id,ntype) {
    const id = user_id;

    let query = "";
    if(log_id == null){
     query += "SELECT device_id from devices WHERE user_id in ( '"+user_id+"', '"+guard_id+"')   group by device_id order by id DESC limit 2";
    }
    else{
         query += "select devices.device_id as device_id, " +
            "   uhost.full_name as host_name, " +
            "       visitor.full_name as visitor_name " +
            " from visit_logs  " +
            " inner join users as uhost ON uhost.id = visit_logs.user_id " +
            " inner join users as visitor ON visitor.id = visit_logs.visitor_id " +
            " inner Join devices ON devices.user_id = visit_logs.user_id " +
            " " +
            "where visit_logs.id = '"+log_id+"' " +
            "group by device_id " +
            "order by device_id desc " +
            "limit 2"
    }
    console.log(query)
    const type = true;

    builder.getresult(query,type,sms,function (result,extra) {
        let custom_sms = sms;
        if(result ){
            // res.send(result);
            const to_device_first = result[0].device_id;
            const to_device_sec = result[1].device_id;
            console.log("Device 1:"+to_device_first)
            console.log("Device 2:"+to_device_sec)
            let sender_init = new gcm.Sender(sender);

// Prepare a message to be sent
            let message = new gcm.Message();

            custom_sms = "Mr "+result[0].visitor_name+" "+ntype+ " by "+result[0].host_name
            if(ntype === "registered"){
                message.addData('key1',sms);
                message.addData('role',role);

                message.addData('message',sms)

                message.addData('title',sms);
                message.addData('msgcnt',sms);
            }
            else{
            message.addData('key1',custom_sms);
            message.addData('role',role);

            message.addData('message',custom_sms)

            message.addData('title',custom_sms);
            message.addData('msgcnt',custom_sms);
            }
            message.addData('soundname','beep3');
            message.delay_while_idle = 1;
            let registrationIds = [];
            registrationIds.push(to_device_first)
            if(guard_id != 0){
              registrationIds.push(to_device_sec)
            }
// Specify which registration IDs to deliver the message to
            //let regTokens = to_device;

// Actually send the message
            sender_init.send(message, registrationIds, function (err, response) {
                if (err){ console.error(err)}
                else{
                    if(ntype === "registered"){
                        save_notfication(user_id,sms)
                    }
                    else{
                        save_notfication(guard_id,custom_sms)
                    }

                 console.log(response);
                }
            });
        }
        else{
            console.log("error sending notofication to User:"+user_id)
        }
    });

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
