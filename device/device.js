const { builder } = require('../helper');

exports.addDevice = (req,res)=> {

    if(!req.body)   return res.sendStatus(400);

    const device_data  = JSON.stringify(req.body);
    const device_param = JSON.parse(device_data);
    const device_query = fn_new_device_query(device_param.userid,device_param.device_id);
    const type = false;
    const sms = "done";
 
    builder.getresult(device_query, type, sms, function (result, extra) {

        if(result.affectedRows > 0){
            const response = [{status: 1, message: "Device added Successfully"}]
            res.send(response)
        }
        else{
            const response = [{status: 0,message: "Failed to add Device"}]
            res.send(response)
        }

    });
};



/**
 * Add New Device
 * @param userid
 * @param deviceid
 * @returns {*}
 */
function fn_new_device_query(userid,deviceid){

    var user_id = "";
    var device_id = "";

    // checking userid
    if(typeof (userid) == "undefined") {
        return false;
    }
    else if(userid.length < 1){
        return false;
    }
    else{
        user_id = userid
    }

    // Checking Device ID
    if(typeof (deviceid) == "undefined"){
        return false;
    }
    else if(deviceid.length < 1){
        return false;
    }
    else{
        device_id = deviceid
    }

    return "INSERT INTO devices (user_id, device_id) VALUES('"+user_id+"','"+device_id+"') ";

}