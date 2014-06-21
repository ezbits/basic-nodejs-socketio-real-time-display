/* required modules */
var express = require("express");
var app = express();
var port = 7000;
var redis = require("redis");

var channel = []; /* array used for each channels client */
var channels = ['c1', 'c2', 'c3', 'c4']; /* redis channels to listen on */

var http = require('http'); /* setup http */
http.createServer(function(req, res) {
});
app.set('views', __dirname + '/jade'); /* setup jade */
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public')); /* setup static dir */
var io = require('socket.io').listen(app.listen(port)); /* setup socketio */
console.log("Listening on port " + port);

for (var i in channels) { /* loop through channels and setup redis subscriptions */
    channel[i] = redis.createClient();
    channel[i].subscribe(channels[i]);
    channel[i].on("message", function(channel, message) { /* on new subscription message, emit message via socketio */
        console.log("channel: %s, message : %s", channel, message);
        io.sockets.emit('message', {message: message, channel: channel});
    });
}

/* 
 * index route 
 */
app.get("/", function(req, res) {
    res.render("main");
});

/* 
 * posting route  
 * 
 * params:
 * t = currently color field
 * c = channel (c1 , c2, c3, c4)
 * m = message 
 * 
 * http://localhost:7000/p?t=blue&c=c1&m=test%20message
 */
app.get("/p", function(req, res) {
    var obj = new Object;
    obj.color = req.param("color");
    obj.message = req.param("m");
    publishMsg(req.param("c"), JSON.stringify(obj));
    res.send(200);
});

/*
 * wrapper to publish message to redis channel
 */
function publishMsg(channel, message) {
    var redisClient = redis.createClient();
    redisClient.publish(channel, message);
}
