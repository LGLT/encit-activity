exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('joinToChatLobby', function () {
            socket.join('lobbyChat');
        });

        socket.on('messageLobby', function (username, msg, teamName) {
            io.to('lobbyChat').emit('sendMessage', {username, msg, teamName});
        });

    });
}