const crypto = require('crypto');
const { builder } = require('../helper');

//User Login
exports.login = (req,res) => {
    if (!req.body) return res.sendStatus(400);

    const login_data    = JSON.stringify(req.body);
    const lognin_values = JSON.parse(login_data);
    const login_query   = fn_login_query(lognin_values.username,lognin_values.password);
    const type          = true;
    const sms           = lognin_values.username;
    //console.log(req.body);

    builder.getresult(login_query,type,sms,function (result,extra) {
        if(result ){
            const sms_login = "Loggedin Successfully"
            res.send(result);
        }
        else{
            console.log('nope');
            const measage = [{status:0,mesage:"Wrong Username or Password"}]
            res.send(measage);
        }
    });

};


/**
 * User Login
 *
 * @param email_address
 * @param password
 * @returns {*}
 */
function fn_login_query(email_address, password) {
    console.log(password)
    const pass = crypto.createHash('md5').update(password).digest("hex");
    // const pass = password
    return "SELECT users.id as userid,roles.role_name as role,users.branch_id FROM users INNER JOIN roles ON roles.id=users.role_id where email='"+email_address+"' and password='"+pass+"'";
}

/**
 * Logout
 */
exports.logout = (req,res)=>{

    if(!req.body)   return res.sendStatus(400);

    const logout_data  = JSON.stringify(req.body);
    const logout_param = JSON.parse(logout_data);
    const type         = false;
    const sms          = "Successfully Loggedout!" ;
    const response     = [{status: 1,message: "Logged Out Successfully"}]

    res.send(response)
};