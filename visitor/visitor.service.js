/**
 * Get Visitor Data by employee ID
 * @param employee_id
 * @returns {*}
 */
exports.fn_get_visitors = (employee_id) => {
    if(employee_id.length < 1){
        return false;
    }
    else{
        return "SELECT visit_logs.id as log_id," +
            " users.full_name as visitor_name, " +
            " users.address as visitor_address, " +
            " users.phone as visitor_contact," +
            " visit_logs.gaurd_id as guard_id," +
            " visit_logs.visitor_id as visitor_id," +
            " CONCAT('"+data_host+"',users.photo,'') as visitor_pic" +
            " FROM users " +
            " INNER JOIN visit_logs on visit_logs.visitor_id = users.id"+
            " "+
            " WHERE  visit_logs.user_id='"+employee_id+"' and visit_status = 0";
    }
}


/**
 * Accept Visitor
 * @param employee_id
 * @param log_id
 * @returns {*}
 */
exports.fn_accept_visitor = (employee_id,log_id,agenda) => {

    var emp_id = "";
    var logid  = "";

    if(typeof (employee_id) == "undefined"){
        return false;
    }
    else if(employee_id.length < 1){
        return false;
    }
    else{
        emp_id = employee_id
    }

    if(typeof log_id == "undefined"){
        return false;
    }
    else if(log_id.length < 1){
        return false;
    }
    else{
        logid = log_id
    }
    return "UPDATE visit_logs SET visit_status =1,visit_agenda ='"+agenda+"' WHERE user_id = '"+emp_id+"' and id='"+logid+"' ";
}



/**
 * Reject Visitor
 * @param employee_id
 * @param log_id
 * @returns {*}
 */
exports.fn_reject_visitor = (employee_id,log_id,reason) => {
    var emp_id = "";
    var logid  = "";

    if(typeof (employee_id) == "undefined"){
        return false;
    }
    else if(employee_id.length < 1){
        return false;
    }
    else{
        emp_id = employee_id
    }

    if(typeof log_id == "undefined"){
        return false;
    }
    else if(log_id.length < 1){
        return false;
    }
    else{
        logid = log_id
    }

    return "UPDATE visit_logs SET visit_status =2 , visit_agenda = '"+reason+"' WHERE user_id = '"+emp_id+"' and id='"+logid+"' ";
}


/**
 * Exit Operation
 * @param employee_id
 * @param log_id
 * @returns {*}
 */
exports.fn_exit_operation = (employee_id,log_id) => {
    let emp_id = "";
    let logid  = "";

    if(typeof (employee_id) == "undefined"){
        return false;
    }
    else if(employee_id.length < 1){
        return false;
    }
    else{
        emp_id = employee_id
    }

    if(typeof log_id == "undefined"){
        return false;
    }
    else if(log_id.length < 1){
        return false;
    }
    else{
        logid = log_id
    }
    const crdatetime = new Date();
    const date = crdatetime.getUTCFullYear() + '-' +
        ('00' + (crdatetime.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + crdatetime.getUTCDate()).slice(-2) + ' ' +
        ('00' + crdatetime.getUTCHours()).slice(-2) + ':' +
        ('00' + crdatetime.getUTCMinutes()).slice(-2) + ':' +
        ('00' + crdatetime.getUTCSeconds()).slice(-2);
    return "UPDATE visit_logs SET visit_status =4, exit_time ='"+date+"' WHERE gaurd_id = '"+emp_id+"' and id='"+logid+"' ";

}



exports.fn_add_card_number = (log_id,cardnumber) => {

    let logid  = "";
    let card    = "";

    if(typeof (log_id) == "undefined"){
        return false;
    }
    else if(log_id.length < 1){
        return false;
    }
    else{
        logid = log_id;
    }

    if(typeof (cardnumber) == "undefined"){
        return false;
    }
    else if(cardnumber.length < 1){
        return false;
    }
    else{
        card = cardnumber;
    }
    return "UPDATE visit_logs SET card_number = '"+card+"', visit_status = 3 WHERE id='"+logid+"' ";
}

/**
 * Visitors History
 * @param employee_id
 * @returns {*}
 */
exports.fn_get_visitors_history = (employee_id) => {
    if(typeof (employee_id) == "undefined"){
        return false;
    }
    else if(employee_id.length < 1){
        return false;
    }
    else{
        return "SELECT visit_logs.id as log_id," +
            "users.full_name as visitor_name," +
            "visit_logs.address as visitor_address," +
            "users.phone as visitor_contact," +
            "CONCAT('"+data_host+"', users.photo,'') as visitor_pic," +
            "visit_agenda as agenda," +
            "DATE_FORMAT(visit_logs.in_time,'%Y-%m-%d') as in_date," +
            "DATE_FORMAT(visit_logs.in_time,'%l:%i %p') as in_time," +
            "DATE_FORMAT(visit_logs.exit_time,'%Y-%m-%d') as out_date, " +
            "DATE_FORMAT(visit_logs.exit_time,'%l:%i %p') as out_time" +
            " FROM visit_logs " +
            " INNER JOIN users on users.id = visit_logs.visitor_id " +
            " WHERE  visit_logs.user_id='"+employee_id+"'";
    }
}


/**
 * Visit list by employee id
 * @param emp_id
 * @returns {*}
 */
exports.fn_get_exist_list = (emp_id) => {
    if(emp_id.length < 1){
        return false;
    }
    else{
        return "SELECT visit_logs.id as log_id," +
            "users.full_name as host,  " +
            "visit_logs.address as visitor_address, " +
            "CONCAT('"+data_host+"',visitor_info.photo,'') as visitor_pic," +
            "DATE_FORMAT(in_time,'%l:%i %p') as in_time," +
            "visitor_info.full_name as visitor_name "+
            "FROM visit_logs " +
            "INNER JOIN users on visit_logs.user_id = users.id " +
            "INNER JOIN users as visitor_info on visitor_info.id = visit_logs.visitor_id " +
            " WHERE  (visit_logs.gaurd_id='"+emp_id+"' OR visit_logs.user_id='"+emp_id+"') and visit_status = 3";
    }
}

/**
 * Pending List
 * @param emp_id
 * @returns {*}
 */
exports.fn_get_pending_list = (emp_id) => {
    if(emp_id.length < 1){
        return false;
    }
    else{
        return "SELECT visit_logs.id as log_id," +
            "users.full_name as host,  " +
            "visit_logs.address as visitor_address, " +
            "CONCAT('"+data_host+"',visitor_info.photo,'') as visitor_pic," +
            "DATE_FORMAT(in_time,'%r') as in_time," +
            "visitor_info.full_name as visitor_name "+
            "FROM visit_logs " +
            "INNER JOIN users on visit_logs.user_id = users.id " +
            "INNER JOIN users as visitor_info on visitor_info.id = visit_logs.visitor_id " +
            " WHERE ( visit_logs.user_id='"+emp_id+"' OR visit_logs.gaurd_id='"+emp_id+"' ) and visit_status = 0 ORDER BY in_time DESC";
    }
}


/**
 * Approved List
 * @param emp_id
 * @returns {*}
 */
exports.fn_get_approved_list = (emp_id,log_id) => {
    if(emp_id.length < 1){
        return false;
    }
    else{

        let approve = "SELECT visit_logs.id as log_id," +
            "users.full_name as host,  " +
            "visit_logs.address as visitor_address, " +
            "CONCAT('"+data_host+"',visitor_info.photo,'') as visitor_pic," +
            "in_time," +
            "visitor_info.full_name as visitor_name "+
            "FROM visit_logs " +
            "INNER JOIN users on visit_logs.user_id = users.id INNER JOIN users as visitor_info on visitor_info.id = visit_logs.visitor_id " ;

        if(log_id === "0"){
            approve += " WHERE users.org_id = (SELECT u.org_id FROM users u WHERE id = '"+emp_id+"') AND (visit_status = 1 OR visit_type = 1)";
        }
        else{
            approve += " WHERE visit_logs.id = '"+log_id+"'"
        }

        return approve
    }
}

/**
 * GET Visitor information by mobile number
 * @param mobile
 * @returns {*}
 */
exports.fn_get_visitor = (mobile) => {
    if(mobile.length < 1){
        return false;
    }
    else{
        return "select" +
            " visit_logs.id as log_id," +
            "users.full_name as visitor_name," +
            "users.phone as visitor_contact," +
            "visit_logs.visitor_company as company_name," +
            "visit_logs.address as company_address," +
            "visit_type, " + 
	    "CONCAT('"+data_host+"', users.photo,'') as visitor_pic" +
	    " from visit_logs" +
            " INNER JOIN users ON users.id = visitor_id"+
            " WHERE users.phone ="+mobile+"  order by visit_logs.id desc limit 1";
    }
}


/**
 * Register Visitor
 *
 * @param name
 * @param img
 * @param contact
 * @param company
 * @param designation
 * @param host_id
 * @param address
 * @returns {*}
 */
exports.fn_register = (name,contact,company,host_id,address,gaurd_id,img) => {

    if(typeof name == "undefined"){
        return false
    }
    else if(name.length == 0){
        return false
    }

    if(typeof contact == "undefined"){
        return contact
    }
    else if(contact < 1){
        return contact
    }

    if(typeof company == "undefined"){
        return false
    }
    else if(company.length == 0){
        return false
    }

    if(typeof host_id == "undefined"){
        return false
    }
    else if(host_id.length == 0){
        return false
    }

    if(typeof address == "undefined"){
        return false
    }
    else if(address.length == 0){
        return false
    }
    if(typeof gaurd_id == "undefined"){
        return false
    }
    else if(gaurd_id < 1){
        return false
    }

    const query = "INSERT INTO users (full_name,address,phone,photo) VALUES ('"+name+"','"+address+"','"+contact+"','"+img+"')";
    return query;
}


/**
 * Send Notification
 *
 * @param guard_id
 * @param sms
 * @param sender_id
 * @param device_id
 * @param host_id
 */
exports.send_register_notification = (user_id,role,ntype,sms) => {
    let query = "SELECT device_id from devices WHERE user_id = '"+user_id+"'  group by device_id order by id DESC limit 1";
     const type = true;
 
     builder.getresult(query,type,sms,function (result,extra) {
         if(result ){
             // res.send(result);
             const to_device_first = result[0].device_id;
 
             console.log("Device 1:"+to_device_first)
 
             let sender_init = new gcm.Sender(sender);
 
             // Prepare a message to be sent
             let message = new gcm.Message();
 
                 message.addData('key1',sms);
                 message.addData('role',role);
 
                 message.addData('message',sms)
 
                 message.addData('title',sms);
                 message.addData('msgcnt',sms);
 
 
             message.addData('soundname','beep3');
             message.delay_while_idle = 1;
             let registrationIds = [];
             registrationIds.push(to_device_first)
 
             sender_init.send(message, registrationIds, function (err, response) {
                 if (err){ console.error(err)}
                 else{
                         save_notfication(user_id,sms)
 
                     console.log(response);
                 }
             });
         }
         else{
             console.log("error sending notofication to User:"+user_id)
         }
     })
}