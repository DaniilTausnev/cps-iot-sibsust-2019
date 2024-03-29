var http = require("http").createServer(handler);
var fs = require("fs"); // variable for file system
var firmata = require("firmata");
const WebSocket = require('ws'); // for permanent connection between server and client

const wss = new WebSocket.Server({port: 8888}); // websocket port is 8888

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 8");
    console.log("Activation of Pin 13");
    board.pinMode(8, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    board.pinMode(5, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    board.pinMode(6, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});

function handler(req, res) {
    fs.readFile(__dirname + "/assignment02.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Error loading html page.");
        }
    res.writeHead(200);
    res.end(data);
    });
}

http.listen(8080); // server will listen on port 8080, html page will be served to client

wss.on('connection', function (ws) { // start of wss code
    ws.on("message", function (value) {
       if(value == "1") {
           board.digitalWrite(13, board.HIGH); // write high on pin 13
       }
       else if(value == "0") {
           board.digitalWrite(13, board.LOW); // write low on pin 13
       } 
       else if(value == "2") {
           board.digitalWrite(8, board.HIGH); // write low on pin 13
       } 
       else if(value == "3") {
           board.digitalWrite(8, board.LOW); // write low on pin 13
       } 
       else if(value == "4") {
           board.digitalWrite(6, board.HIGH); // write low on pin 13
       } 
       else if(value == "5") {
           board.digitalWrite(6, board.LOW); // write low on pin 13
       } 
       else if(value == "6") {
           board.digitalWrite(5, board.HIGH); // write low on pin 13
       } 
       else if(value == "7") {
           board.digitalWrite(5, board.LOW); // write low on pin 13
       } 
       else if(value == "9") {
           board.digitalWrite(5, board.LOW); // write low on pin 13
           board.digitalWrite(8, board.LOW); // write low on pin 13
           board.digitalWrite(6, board.LOW); // write low on pin 13
           board.digitalWrite(13, board.LOW); // write low on pin 13
       } 
       else if(value == "8") {
           board.digitalWrite(5, board.HIGH); // write low on pin 13
           board.digitalWrite(8, board.HIGH); // write low on pin 13
           board.digitalWrite(6, board.HIGH); // write low on pin 13
           board.digitalWrite(13, board.HIGH); // write low on pin 13
       } 
    });
}); // end of wss code