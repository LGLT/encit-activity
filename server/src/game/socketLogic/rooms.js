var teamsRooms = 
[
    {
        name: 'Ciclo hidrológico',
        teammates: []
    },
    {
        name: 'Ciclo del carbono',
        teammates: []
    },
    {
        name: 'Ciclo del nitrógeno',
        teammates: []
    },
    {
        name: 'Ciclo del azufre',
        teammates: []
    },
    {
        name: 'Ciclo del fósforo',
        teammates: []
    },
    {
        name: 'Ciclo del oxígeno',
        teammates: []
    },
]

var gameInCourse = false;

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        //  Verificar si ya hay una partida jugándose.
        socket.on('checkGameInCourse', function () {
            socket.emit('gameInCourse', (gameInCourse ? true : false)); 
        })

        //  Mandar la información actual de los rooms.
        socket.on('bringRooms', function () {
            socket.join(0);
            io.to(0).emit('sendRooms', (teamsRooms)); 
        })
        
        //  Unir un jugador a un equipo.
        socket.on('joinToTeam', function (teamName, username, actualTeamName) {
            console.log(teamName, username, actualTeamName)
            if(actualTeamName) {
                if(actualTeamName === teamName) return;
                else {
                    teamsRooms.map(t => {
                        if(t.name === actualTeamName) {t.teammates.splice(t.teammates.indexOf(username), 1); socket.leave(actualTeamName)}
                        if(t.name === teamName) {t.teammates.push(username); io.to(0).emit('addTeamLocalStorage', t.name); socket.join(teamName);}
                    })
                    io.to(0).emit('sendRooms', (teamsRooms));
                }
            }
            else {
                teamsRooms.map(t => {
                    if(t.name === teamName){
                        t.teammates.push(username);
                        io.to(0).emit('addTeamLocalStorage', t.name);
                        socket.join(t.name);
                    }
                    io.to(0).emit('sendRooms', (teamsRooms));
                })
            }
        });

    });
}

