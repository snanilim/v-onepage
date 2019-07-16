const {builder, web_img_dir} = require('../helper');
const {fn_get_visitors,
    fn_accept_visitor,
    fn_reject_visitor,
    fn_exit_operation,
    fn_add_card_number,
    fn_get_visitors_history,
    fn_get_visitor,
    fn_get_approved_list,
    fn_get_pending_list,
    fn_get_exist_list,
    fn_register,
    send_register_notification,
    nofity_accept_reject,
    send_notification
} = require('./visitor.service');
const moment = require('moment-timezone');
var con = require('../config/database');


/**
 * Visitor Request
 */
exports.getVisitor = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id       = req.params.employee_id;
    const visitor_query     = fn_get_visitors(employee_id);
    const type              = true;
    const sms               = "Success" ;

    console.log(visitor_query);

    builder.getresult(visitor_query,type,sms,function (result) {
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
 * Accept Visitor
 */
exports.acceptVisitor = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const accept_visitor_param  = JSON.stringify(req.body);
    const accept_visitor        = JSON.parse(accept_visitor_param);
    const accept_query          = fn_accept_visitor(accept_visitor.employee_id,accept_visitor.log_id,accept_visitor.agenda);
    const guard_id              = accept_visitor.guard_id
    const host_id               = accept_visitor.employee_id
    const log_id                = accept_visitor.log_id
    const type                  = true;
    const sms                   = "Success";

    console.log('accept_query', accept_query)
    builder.getresult(accept_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result.affectedRows > 0){
            const sms_notify = "Visitor Accepted"
            const role = "Frontdesk";
            const ntype = "accepted"
           // send_notification(host_id,sms_notify,guard_id,role,log_id,ntype)
            nofity_accept_reject(log_id,guard_id,host_id,role,sms,ntype)
            const response = [{status: 1, message:"Visitor Accepted"}]
            res.send(response);
        }
        else{
            const response = [{status: 0, message:"Failed"}]
            res.send(response);
        }
    });
    //con.end();
};


/**
 * Reject Visitor
 */
exports.rejectVisitor = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const reject_visitor_param  = JSON.stringify(req.body);
    const reject_visitor        = JSON.parse(reject_visitor_param);
    const reject_query          = fn_reject_visitor(reject_visitor.employee_id,reject_visitor.log_id,reject_visitor.reason);
    const host_id               = reject_visitor.employee_id
    const guard_id              = reject_visitor.guard_id
    const log_id                = reject_visitor.log_id
    const type                  = true;
    const sms                   = "Success" ;

    builder.getresult(reject_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result.affectedRows > 0){
            const sms_notify = "Visitor Rejected"
            const role = "Frontdesk"
            const ntype = "rejected"
            send_notification(host_id,sms_notify,guard_id,role,log_id,ntype)
            const response = [{status: 1, message:"Visitor Rejected"}]

            res.send(response);
        }
        else{
            const response = [{status: 0, message:"Failed"}]
            res.send(response);
        }
    });
};

/**
 * Exit Operation
 */
exports.exitOperation = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const exit_visitor_param = JSON.stringify(req.body);
    const exit_visitor       = JSON.parse(exit_visitor_param);
    const exit_query         = fn_exit_operation(exit_visitor.employee_id, exit_visitor.log_id);
    const type               = true;
    const sms                = "Success" ;

    builder.getresult(exit_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result.affectedRows > 0){
            const response = [{status: 1, message:"Sent to Exit list"}]
            res.send(response);
        }
        else{
            const response = [{status: 0, message:"Failed"}]
            res.send(response);
        }

    });
};


/**
 * Visitor Entry : Add Card Number
 */
exports.visitorEntry = (req,res) => {

    if(!req.body) return res.sendStatus(400);
    const entry_visitor_param = JSON.stringify(req.body);
    const entry_visitor       = JSON.parse(entry_visitor_param);
    const entry_query         = fn_add_card_number(entry_visitor.log_id,entry_visitor.card_no);
    const type                = true;
    const sms                 = "Success" ;

    builder.getresult(entry_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }
        if(result.affectedRows > 0){
            const response = [{status: 1, message:"Card Number Added Successfully"}]
            res.send(response);
        }
        else{
            const response = [{status: 0, message:"Failed"}]
            res.send(response);
        }

    });
};


/**
 * Visitor History
 */
exports.visitorHistory = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.employee_id;
    const history_query = fn_get_visitors_history(employee_id);
    const type          = true;
    const sms           = "Success" ;
    console.log(history_query)
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
 * Exist List
 */
exports.existList = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.emp_id;
    const exist_query   = fn_get_exist_list(employee_id);
    const type          = true;
    const sms           = "Success" ;

    console.log(exist_query)

    builder.getresult(exist_query,type,sms,function (result) {
        //   if(error) { res.send(500, "Server Error"); return; }

        if(result){
            res.send(result);
        }
        else{
            const response = [{status: 0,message:"Not Found"}]
            res.send(response);
        }

    });

};


/**
 * Pending List
 */
exports.pendingList = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id   = req.params.emp_id;
    const pending_query = fn_get_pending_list(employee_id);
    const type          = true;
    const sms           = "Success" ;

    builder.getresult(pending_query,type,sms,function (result) {
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
 * Approved list
 */
exports.approvedList = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const employee_id       = req.params.emp_id;
    const log_id            = req.params.log_id;
    const approved_query    = fn_get_approved_list(employee_id,log_id);
    const type              = true;
    const sms               = "Success" ;
    console.log(approved_query)
    builder.getresult(approved_query,type,sms,function (result) {
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
 * visitor info by Mobile Number
 */
exports.visitorInfo = (req,res) => {

    if(!req.body) return res.sendStatus(400);

    const mobile_number = req.params.visitor_contact;
    const visitor_query = fn_get_visitor(mobile_number);
    const type          = true;
    const sms           = "Success" ;

    console.log(visitor_query);

    builder.getresult(visitor_query,type,sms,function (result) {
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


// Register Visitor
exports.visitorRegister = (req,res,next) => {
    // console.log(req.body);
    // console.log(req.file);
    if (!req.body) return res.sendStatus(400);
    // console.log("Post Receiving....")
    // console.log(req.file);
    // console.log(req.body);
    const register_data  = JSON.stringify(req.body);
    const register_param = JSON.parse(register_data);
    const img            = web_img_dir+"/"+req.file.filename;
    const name           = register_param.visitor_name;//
    const company        = register_param.company_name;//--
    const address        = register_param.company_address;//
    const host_id        = register_param.host_id;//--
    const contact        = register_param.visitor_contact;//
    const gaurd_id       = register_param.gaurd_id //--
    const register_query = fn_register(name,contact,company,host_id,address,gaurd_id,img);
    const sms            = null;
    const type           = true;

    if(register_query){
        builder.getresult(register_query,type,sms,function (result,extra) {
            //   if(error) { res.send(500, "Server Error"); return; }
            console.log('result', result)
            if(result.insertId){
                const crdatetime = new Date();
                // const date = crdatetime.getUTCFullYear() + '-' +
                //     ('00' + (crdatetime.getUTCMonth()+1)).slice(-2) + '-' +
                //     ('00' + crdatetime.getUTCDate()).slice(-2) + ' ' +
                //     ('00' + crdatetime.getUTCHours()).slice(-2) + ':' +
                //     ('00' + crdatetime.getUTCMinutes()).slice(-2) + ':' +
                //     ('00' + crdatetime.getUTCSeconds()).slice(-2);
                const timezonedate = moment.tz(crdatetime, "Asia/Dhaka").format().replace("T"," ").replace("+06:00","")
                console.log(timezonedate)
                const  id   = result.insertId
                const  q     = "INSERT INTO visit_logs (visitor_id,gaurd_id,user_id,visitor_company,address,visit_type,in_time,visit_status) value ('"+id+"','"+gaurd_id+"','"+host_id+"','"+company+"','"+address+"','0','"+timezonedate+"','0')"
               // console.log(q);
                con.query(q, (error, rows, fileds) => {
                    if(!!error){
                        console.log(error)
                        const response = "Unable to add visitor SQL-STATE"
                        res.send(response)
                    }
                    else{
                        if(rows){
                            const sms_notify = "Mr. "+name+" from "+company+" has arrived now. please response to the request at earliest time."
                            const role = "Host"
                            const log_id = null;
                            const ntype = "registered"
                           // send_notification(host_id,sms_notify,0,role,log_id,ntype)
                            send_register_notification(host_id,role,ntype,sms_notify)
                            const response = "Visitor Added successfully"
                            res.send(response)
                        }
                        else{
                            const response = "Unable to add visitor"
                            res.send(response)
                        }
                    }

                });
            }
            else{
                const response =  "Unable to add visitor"
                res.send(response)
            }
        });
    }
    else{
        const response = "Invalid Request"
        res.send(response)
    }
};