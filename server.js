var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var servo;
var motor;
var five = require("johnny-five");
var Spark = require("spark-io");
var path = require("path");
var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());

app.engine('ejs', require('ejs').renderFile);
//app.set('views', './public/assets/views');
app.set('view engine', 'ejs');

var Router = express.Router();
Router.get('/', function(req,res){
//    console.log('HIT');
    res.render('index');
});

Router.post('/nodeboat', function(req, res){
    if(req && req.body && req.body.degree){
        var degree = req.body.degree;
//        console.log('DEGREE FOUND IS: ' + degree);
        servo.to(degree);
//        res.status(200);
        res.redirect('/');
    }
    else{
    console.log('DEGREE NOT FOUND ');
    console.log(req);
    }
});

Router.post('/nodeboat/power', function(req, res){
    if(req && req.body && req.body.power){
        var degree = req.body.power;
        console.log('DEGREE FOUND IS: ' + degree);
        servo.to(degree);
//        res.status(200);
        res.redirect('/');
    }
    else{
    console.log('DEGREE NOT FOUND ');
    console.log(req);
    }
});

app.use(Router);
app.listen(1337);
console.log('Server running at 127.0.0.1:1337/');

board.on("ready", function() {
//  var led = new five.Led("D7");
//  led.blink();
    console.log('Starting TheNodeBoat -- READY');

//   Servo alternate constructor with options
    servo = new five.Servo({
        id:"MyServo",
        pin: "D0"
  });

//    motor = new five.Motor({
//     pins:{
//      pwm:"A0",
//        dir:"D0",
//         cdir:"D1"
//     }
//    });
//    motor.start(255);
    
});

