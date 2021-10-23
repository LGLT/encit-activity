exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('message', function (username, msg, teamName) {
            io.to(teamName).emit('sendMessage', {username, msg, teamName})
        });

    });
}