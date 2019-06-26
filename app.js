const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const Multer = require('multer');
const moment = require('moment-timezone');
var db = require('./config/database');
var dbfunc = require('./config/db-function');


dbfunc.connectionCheck.then((data) =>{
    console.log('database connected');
 }).catch((err) => {
     console.log(err);
});

const app = express();
const jsonParser = bodyParser.json()
const urlBodyParse = bodyParser.urlencoded({extended: false})


moment().tz("Asia/Dhaka").format();
const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../webApp/public/images/')
    },
    filename: function (req, file, cb) {
        const mime = file.mimetype;
        const extention = mime.split('/')
        cb(null, file.fieldname + '-' + Date.now()+"."+extention[1])
    }
})
const upload = Multer({  dest: '../webApp/public/images',storage: storage });
const mom =  new Date();
console.log(moment.tz(mom, "Asia/Dhaka").format().replace("T"," ").replace("+06:00",""));


// Firebase Sender ID
const sender = 'AAAAtycriZo:APA91bE0f-71mkbCtblLbz6WWMYmNaOVBgtvbFF1dhSW40IcjwKFSjVP79AwLKe_8wRYorRDyAWW3krAwOJ7Ekivu4-zXB7uqfqBqh7Zb2ZD7P0HxJZcEPxsUIQNqHvYdbH4PKYNdW9R';
// Firebase to Device ID
const deviceid = 'eh31UyJ2tK8:APA91bEC9kl1HPwggBqHblkrtBzXK_2pkhLav1ZyF_yhtXF1LbD6-BE6gZHRQFSCzsZk-FPFluyJwK740OGKXyzoCdbDNDvjl15XPZrzeUc3FVqIa8Pi9Fbuvj-rSRPi0mAPASVG-WDf';



/*===================== DB Query Builder =================*/


// parse various different custom JSON types as JSON
app.use(morgan('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.json());



/*=============== API Action ============*/

//API Root
app.get('/',(req,res)=>{res.send("Welcome to vTracker Api")});
const auth = require('./auth/auth')
const device = require('./device/device')
const user = require('./user/user')
const visitor = require('./visitor/visitor');
const host = require('./host/host');

app.post('/api/login', urlBodyParse, auth.login);
app.post('/api/logout', urlBodyParse, auth.logout);
app.post('/api/device', urlBodyParse, device.addDevice);
app.get('/api/user/profile/:employee_id', user.getProfile);
app.get('/api/user/notification/:employee_id', user.getNotification);
app.post('/api/user/reset_password', urlBodyParse, user.resetPassword);
app.get('/api/visitor/:employee_id', visitor.getVisitor);
app.post('/api/visitor/accept', urlBodyParse, visitor.acceptVisitor);
app.post('/api/visitor/reject', urlBodyParse, visitor.rejectVisitor);
app.post('/api/visitor/exit', urlBodyParse, visitor.exitOperation);
app.post('/api/visitor/entry', urlBodyParse, visitor.visitorEntry);
app.get('/api/visitor/history/:employee_id', visitor.visitorHistory);
app.get('/api/visitor/exist/:emp_id', visitor.existList);
app.get('/api/visitor/pending/:emp_id', visitor.pendingList);
app.get('/api/visitor/approved/:emp_id/:log_id', visitor.approvedList);

app.get('/api/visitor/info/:visitor_contact', visitor.visitorInfo);
app.get('/api/host/search/:employee_id/:branch_id', host.hostSearch);

app.get('/api/host/', host.hostList);
app.post('/api/visitor/register', upload.single('visitor_pic'), visitor.visitorRegister);

module.exports = app;