exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        // socket.on('roomSub', function (teamName) {
        //     socket.join(teamName)
        // });

        socket.on('message', function (username, msg, teamName) {
            console.log('Clientes en room:', io.sockets?.adapter.rooms.get(teamName))
            // socket.emit('sendMessage', `${username}: ${msg}`);
            io.to(teamName).emit('sendMessage', `${username}: ${msg}`)
        });

    });
}