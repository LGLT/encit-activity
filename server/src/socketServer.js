"use strict";
exports.__esModule = true;
var express = require("express");
var http = require('http');
var appSocket = express();
var server = http.createServer(appSocket);

var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

var rooms = require("./game/socketLogic/rooms")(io);
var gameLogic = require("./game/socketLogic/gameLogic")(io);
var teamChat = require("./game/socketLogic/teamChat")(io);
var timer = require("./game/socketLogic/timer")(io);
var lobbyChat = require("./game/socketLogic/lobbyChat")(io);

require("reflect-metadata");

var cors = require("cors");
const { type } = require("os");

// import socketServer from "./socket";
// const io = socketServer(server);
appSocket.use(express.json());
appSocket.use(express.urlencoded({ extended: false }));
appSocket.use(cors());
server.listen(9000, function () {
    console.log('Server listening at port 9000.');
});

