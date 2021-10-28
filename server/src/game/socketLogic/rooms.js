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
            if(!gameInCourse) io.to(0).emit('sendRooms', (teamsRooms)); 
            else io.to(0).emit('gameInCourse')
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
                            socket.teamName = teamName;
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

        socket.on('joinToTeamIfRefresh', function (username, teamName){
            teamsRooms.map(t => {
                if(t.name === teamName && t.teammates.indexOf(username) === -1) {
                    t.teammates.push(username);
                    socket.teamName = t.name;
                } 
            })
        });

        socket.on('roomSub', function (teamName) {
            socket.join(teamName)
            if(!gameInCourse) gameInCourse = true;
        });

        socket.on('restartGame', function (teamName) {
            if(gameInCourse) gameInCourse = false;
        });
    });
}

