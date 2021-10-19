exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('message', function (username, msg, teamName) {
            console.log(username, msg, teamName)
            socket.emit('sendMessage', `${username}: ${msg}`);
    
        });

    });
}