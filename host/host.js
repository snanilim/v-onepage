const {builder} = require('../helper');

/**
 * Host Search-----------------------------------------------------
 */
exports.hostSearch = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.employee_id;
    const branch_id   = req.params.branch_id;
    const history_query = fn_get_host(employee_id,branch_id);
    const type          = true;
    const sms           = "Success" ;
   console.log(history_query+"HOST");
    builder.getresult(history_query,type,sms,function (result,extra) {
        //   if(error) { res.send(500, "Server Error"); return; }

        if(result){
            res.send(result);
        }
        else{
            const response = [{status:0, message: "Not Found"}]
            res.send(response)
        }
    });
};


/**
 * Host List---------------------------------------------
 */
exports.hostList = (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const host_query        = fn_get_host_list();
    const type              = true;
    const sms               = "Success" ;

    console.log(host_query);
    builder.getresult(host_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result){
            res.send(result);
        }
        else{
            const respose = [{status: 0, message: "Not found"}]
            res.send(respose)
        }
    });
};


/**
 * Search Host
 */
function fn_get_host(employee_id,branch_id){
    if(typeof (employee_id) == "undefined"){
        return false;
    }
    else if(employee_id.length < 1){
        return false;
    }
    else if(typeof branch_id == "undefined"){
        return false
    }
    else if (branch_id.length < 1){
        return false;
    }
    else{
        let random = "select users.id as host_id," +
            "CONCAT('"+data_host+"', users.photo,'') as host_pic," +
            "users.phone as host_contact," +
            "users.email as host_email," +
            "users.full_name as host_name," +
            "designation.deg_name as host_deg " +
            "from users";
        if(employee_id != 0){
           random += " inner JOIN designation on designation.id = users.deg_id WHERE  users.full_name Like '%"+employee_id+"%' and users.role_id = 4 AND branch_id ='"+branch_id+"' ";
        }
        else{
            random += " inner JOIN designation on designation.id = users.deg_id WHERE  users.role_id = 4 AND branch_id ='"+branch_id+"' ";

        }
        return random;
    }
}


/**
 * Get Host list
 * @returns {string}
 */
function fn_get_host_list() {

    return "SELECT users.id as host_id,designation.deg_name as host_deg,full_name as host_name,phone as host_contact,email as host_email,CONCAT('"+data_host+"',photo,'') as host_pic FROM users Inner JOIN designation on designation.id = users.deg_id where role_id = 4";

}