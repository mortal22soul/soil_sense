var http = require("http");
var fs = require("fs");
var index = fs.readFileSync("index.html");
var { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const path = require("path");

// const Readline = SerialPort.parsers.Readline;

// const parsers = SerialPort.parsers;

var port = new SerialPort({
  path: "COM4",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

const parser = new ReadlineParser();
port.pipe(parser);

var app = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

const io = require("socket.io")("COM4");

io.on("connection", function (socket) {
  console.log("Node is listening to port");
});

parser.on("data", function (data) {
  console.log("Received data from port: " + data);

  io.emit("data", data);
});

app.listen(3000);
