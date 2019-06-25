const crypto = require('crypto');
const {builder, data_host} = require('../helper');

/**
 * User Profile
 */
exports.getProfile = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.employee_id;
    const profile_query = fn_get_profle(employee_id);
    const type          = true;
    const sms           = "" ;
    console.log(profile_query);
    builder.getresult(profile_query,type,sms,function (result,extra) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result){
            res.send(result);
        }
        else{
            const response = [{status:0,message:"Not Found"}]
            res.send(response);
        }

    });

};
/**
 * User Notification
 */
exports.getNotification = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.employee_id;
    const notification = fn_get_notification(employee_id);
    const type          = true;
    const sms           = "" ;
    console.log(notification)
    builder.getresult(notification,type,sms,function (result,extra) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result){
            res.send(result);
        }
        else{
            const response = [{status:0,message:"Not Found"}]
            res.send(response);
        }

    });

};

/**
 * Reset Password
 */
exports.resetPassword = (req,res)=>{

    if(!req.body) return res.sendStatus(400);

    console.log(req.body)
    const password_param = JSON.stringify(req.body);
    const password       = JSON.parse(password_param);
    const reset_query    = fn_reset_password(password.password,password.emp_id,password.old_pass);
    const type           = false;
    const sms            = "Success" ;
    console.log(reset_query);
    builder.getresult(reset_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }

        if(result.affectedRows > 0){
            const response = [{status: 1,message: "Password changed successfully"}]
            res.send(response);
        }
        else{
            const response = [{status: 0,message: "Failed to change Password"}]
            res.send(response);
        }
    });
};



/**
 * Get User profile
 * @param employee_id
 * @returns {*}
 */
function fn_get_profle(employee_id){
    if(employee_id.length < 1){
        return false;
    }
    else{
        return "SELECT users.id as log_id," +
            "users.full_name as emp_name, " +
            "designation.deg_name as designation, " +
            "users.phone as emp_contact," +
            "DATE_FORMAT(users.updated_at,'%d %M, %Y') as updated_date," +
            "CONCAT('"+data_host+"',users.photo,'') as emp_photo " +
            "FROM users " +
            "INNER JOIN designation on designation.id = users.deg_id " +
            "INNER JOIN roles on roles.id = users.role_id"+
            " WHERE  users.id ='"+employee_id+"'";
    }
}

/**
 * Get User notification
 */

function fn_get_notification(id) {
    if(id){
        const query = "select DATE_FORMAT(created_at,'%D %M, %Y') as date,DATE_FORMAT(created_at,'%l:%i %p') as time, notify as Message from notifications where user_id = '"+id+"'"
        return query;
    }
    else{
        return false
    }
}

/**
 * Reset Password
 * @param password
 * @param id
 * @returns {*}
 */
function fn_reset_password(password,id,old_pass) {
    let pass = "";
    let uid = "";
    let old = "";

    // Check Password
    if(typeof(password) == "undefined"){
        return "password undefined";
    }
    else if(password.length < 1){
        return password.length
    }
    else{
        pass = crypto.createHash('md5').update(password).digest("hex");
    }

    // Check User id
    if(typeof (id) == "undefined"){
        return "id undefined"
    }
    else if(id.length < 1){
        return id.length
    }
    else{
        uid = id;
    }

    // Check User id
    if(typeof (old_pass) == "undefined"){
        return false
    }
    else if(old_pass.length < 1){
        return old_pass.length
    }
    else{
        old = crypto.createHash('md5').update(old_pass).digest("hex");
    }

    return "UPDATE users set password ='"+pass+"' WHERE id='"+uid+"' AND password = '"+old+"'";
}