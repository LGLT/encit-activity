var questions = require('../questionBank/questions');

var teamsRooms = require('./teamsInfo');

let selections = {
    hidrologico: [],
    carbono: [],
    nitrogeno: [],
    azufre: [],
    fosforo: [],
    oxigeno: []
}

let usersFinished = [];

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        
        socket.on("disconnect", (reason) => {
            // console.log(`${socket.name} se ha desconectado. ${socket.teamName}`)
            teamsRooms.map(t => {
                if(t.teammates.indexOf(socket.name) !== -1) {
                    t.teammates.splice(t.teammates.indexOf(socket.name), 1);
                }
            })
            io.to(socket.teamName).emit('reviewSelections')
            io.to(socket.teamName).emit('sendMessage', {username: 'Server', msg: `${socket.name} ha abandonado`})
        });

        socket.on('createSocketName', function(username) {
            socket.name = username;
            // console.log(socket.name);
        })

        socket.on('joinToGame', function (username) {
            socket.join('game');
            if(!socket.name) socket.name = username;
        });

        socket.on('bringQuestions', function (teamName) {

            teamsRooms.map(t => {

                teamsRooms.map(t => {
                    if(t.name === teamName) socket.emit('updateQuestionIndex', t.actualQuestion);
                })

                if(t.name === teamName && t.questionsSended.length === 0) {
                    let questionsArray = [];

                    Object.keys(questions).forEach(key => questionsArray.push({
                        data: questions[key]
                    }));

                    questionsArray.map(q => {
                        let randomOrderOptions = q.data.options.sort((a, b) => 0.5 - Math.random());
                        q.data.options = randomOrderOptions;
                    })
                    
                    let randomOrderQuestions = questionsArray.sort((a, b) => 0.5 - Math.random());

                    t.questionsSended = randomOrderQuestions;
        
                    io.to(teamName).emit('sendQuestions', randomOrderQuestions);
                }
                if(t.name === teamName && t.questionsSended.length > 0) io.to(teamName).emit('sendQuestions', t.questionsSended)
            })
            

        });

        socket.on('selectedOption', function (username, teamName, option) {
            // console.log('SELECTED OPTION')
            if(teamName === 'Ciclo hidrológico') {
                selections.hidrologico.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.hidrologico)
            }
            if(teamName === 'Ciclo del carbono') {
                selections.carbono.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.carbono)
            }
            if(teamName === 'Ciclo del nitrógeno') {
                selections.nitrogeno.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.nitrogeno)
            } 
            if(teamName === 'Ciclo del azufre') {
                selections.azufre.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.azufre)
            } 
            if(teamName === 'Ciclo del fósforo') {
                selections.fosforo.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.fosforo)
            } 
            if(teamName === 'Ciclo del oxígeno') {
                selections.oxigeno.push({name: username, option })
                io.to(teamName).emit('showSelectedOption', selections.oxigeno)
            }
        });

        socket.on('checkAllSelections', function (num, teamName) {
            // console.log('NUM:', num, 'Veces entrado...')
            teamsRooms.map(t => t.name === teamName 
                ? num >= t.teammates.length ? socket.emit('selectionsFinished') : null
                : null
            )
        });

        socket.on('mostSelected', function (selections, teamName) {
            // console.log('MOST SELECTED')
            let results = [];
            selections.map(s => results.push(s.option))

            let mostSelected;
            let timesSelected = 0;

            for(let i = 0; i < results.length; i++) {
                let acc = 0;
                for(let j = 0; j < results.length; j++) {
                    if(results[j] === results[i]) acc++;
                }
                if(acc > timesSelected) { timesSelected = acc; mostSelected = results[i] }
                results[i]
            }

            socket.emit('compareResult', mostSelected)
        });

        socket.on('nextQuestion', function (teamName, questionIndex) {
            // console.log('la siguiente pregunta es: ', questionIndex);
            teamsRooms.map(t => {
                if(t.name === teamName && t.actualQuestion < questionIndex) t.actualQuestion = questionIndex;
            })
            setTimeout(() => {
                io.to(teamName).emit('changeQuestion', questionIndex);
            }, 2000);
        })

        socket.on('cleanSelections', function(teamName) {
            if(teamName === 'Ciclo hidrológico') selections.hidrologico = []
            if(teamName === 'Ciclo del carbono') selections.carbono = []
            if(teamName === 'Ciclo del nitrógeno') selections.nitrogeno = []
            if(teamName === 'Ciclo del azufre') selections.azufre = []
            if(teamName === 'Ciclo del fósforo') selections.fosforo = []
            if(teamName === 'Ciclo del oxígeno') selections.oxigeno = []
        })

        socket.on('bringAllTeamsScore', function(score, teamName) {
            let allScores = [];
            if(!score) score = 0;
            teamsRooms.map(t => {
                if(t.name === teamName) t.score === parseInt(score) ? null : t.score = parseInt(score);
                allScores.push({team: t.name, score: t.score})
            })
            // console.log('SCORES:', allScores)
            io.emit('sendAllTeamsScore', allScores)
        })

        socket.on('saveFinished', function () {
            usersFinished.push(socket.id);
            if(io.sockets.adapter.rooms.get('game') && usersFinished.length === io.sockets.adapter.rooms.get('game').size) {
                let highScoreTeams = []
                let highScore = 0;

                teamsRooms.map(t => {
                    if(t.score === highScore){
                        highScoreTeams.push(t.name);
                    }
                    else if(t.score > highScore) {
                        highScore = t.score;
                        highScoreTeams = [t.name]
                    }
                })
                io.emit('endGame', highScoreTeams);
            } 
        });

        socket.on('restartGame', function (teamName) {
            // console.log('RESTARGAME')
            socket.leave(teamName);
            socket.leave('game');

            if(selections.azufre.length > 0) selections.azufre = [];
            if(selections.carbono.length > 0) selections.carbono = [];
            if(selections.hidrologico.length > 0) selections.hidrologico = [];
            if(selections.nitrogeno.length > 0) selections.nitrogeno = [];
            if(selections.oxigeno.length > 0) selections.oxigeno = [];
            if(selections.fosforo.length > 0) selections.fosforo = [];

            usersFinished = []

            teamsRooms.map(t => {
                if(t.teammates.length > 0) t.teammates = [];
                if(t.score > 0) t.score = 0;
            });
            
            socket.emit('cleanLocalStorage');
        });

        socket.on('saveSocketName', function (username) {
            socket.name = username;
        })

        socket.on('BacteritasAdmin', function() {
            io.to(0).emit('redirectToGame')
        })

        socket.on('leftGame', function (username, teamName) {
            socket.leave(teamName);
            socket.leave('game');
            teamsRooms.map(t => {
                if(t.teammates.indexOf(socket.name) !== -1) {
                    t.teammates.splice(t.teammates.indexOf(username), 1);
                }
            })
        })
    });
}
    