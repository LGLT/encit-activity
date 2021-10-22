var teamsRooms = require('./teamsInfo')

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
                        if(t.name === actualTeamName) {
                            t.teammates.splice(t.teammates.indexOf(username), 1); 
                            socket.leave(actualTeamName)
                        }
                        if(t.name === teamName) {
                            t.teammates.push(username); 
                            socket.emit('addTeamLocalStorage', t.name);
                        }
                    })
                    io.to(0).emit('sendRooms', (teamsRooms));
                }
            }
            else {
                teamsRooms.map(t => {
                    if(t.name === teamName){
                        t.teammates.push(username);
                        socket.emit('addTeamLocalStorage', t.name);
                    }
                })
                io.to(0).emit('sendRooms', (teamsRooms));
            }
        });


        socket.on('roomSub', function (teamName) {
            socket.join(teamName)
        });

        // socket.on('teammates', function (teamName) {
        //     teamsRooms.map(t => t.name === teamName ? console.log(t.teammates) : null)
        // })

    });
}

