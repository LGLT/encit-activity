let timeMinutes = 9;
let timeSeconds = 59;

let timeIsOver = []

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        // socket.on('roomSub', function (teamName) {
        //     socket.join(teamName)
        // });

        //  Indicar que la cuenta regresiva ya ha comenzado.
        socket.on('startCount', function () {
            socket.emit('setStartCount')
        });

        //  Traer el tiempo actual, almacenado en el servidor. (Cada segundo se realiza)
        socket.on('getTime', function () {
            if(timeSeconds === 0){
                timeMinutes = timeMinutes - 1;
                timeSeconds = 59; 
                socket.emit('sendTime', timeMinutes, timeSeconds);
            } else {
                timeSeconds = timeSeconds - 1;
                socket.emit('sendTime', timeMinutes, timeSeconds);
            }
        });
        

    });
}