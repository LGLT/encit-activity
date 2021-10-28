let timeMinutes = 9;
let timeSeconds = 59;
let timerHost = [];
let timeIsOver = []

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('timerHost', function(host, organicStart) {
            if(timerHost.length === 0 && organicStart === 'true') {
                timerHost.push(host)
                console.log('TIMERHOST:', timerHost)
                io.emit('saveTimerHost', host);
            }
        });

        //  Indicar que la cuenta regresiva ya ha comenzado.
        socket.on('startCount', function () {
            socket.emit('setStartCount')
        });

        //  Traer el tiempo actual, almacenado en el servidor. (Cada segundo se realiza)
        socket.on('getTime', function () {
            if(timeSeconds === 0){
                timeMinutes = timeMinutes - 1;
                timeSeconds = 59; 
                io.emit('sendTime', timeMinutes, timeSeconds);
            } else {
                timeSeconds = timeSeconds - 1;
                io.emit('sendTime', timeMinutes, timeSeconds);
            }
        });
        
        socket.on('restartGame', function () {
            timeMinutes = 9;
            timeSeconds = 59;
            timerHost = [];
        });

    });
}