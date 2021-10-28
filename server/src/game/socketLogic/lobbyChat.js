exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('joinToChatLobby', function (username) {
            socket.join('lobbyChat');
            io.to('lobbyChat').emit('sendMessage', {username: 'Server', msg: `${username} se ha unido.`});
        });

        socket.on('messageLobby', function (username, msg, teamName) {
            io.to('lobbyChat').emit('sendMessage', {username, msg, teamName});
        });

    });
}