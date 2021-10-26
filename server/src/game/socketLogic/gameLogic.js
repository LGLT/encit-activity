var questionsAzufre = require('../questionBank/questionsAzufre');
var questionsCarbono = require('../questionBank/questionsCarbono');
var questionsFosforo = require('../questionBank/questionsFosforo');
var questionsHidrologico = require('../questionBank/questionsHidrologico');
var questionsNitrogeno = require('../questionBank/questionsNitrogeno');
var questionsOxigeno = require('../questionBank/questionsOxigeno');

var teamsRooms = require('./teamsInfo')

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

        socket.on('joinToGame', function () {
            socket.join('game');
        });

        socket.on('bringQuestions', function (teamName) {
            let questions = [];

            if(teamName === 'Ciclo hidrológico') Object.keys(questionsHidrologico).forEach(key => questions.push({
                data: questionsHidrologico[key]
             }));
            if(teamName === 'Ciclo del carbono') Object.keys(questionsCarbono).forEach(key => questions.push({
                data: questionsCarbono[key]
             }));
            if(teamName === 'Ciclo del nitrógeno') Object.keys(questionsNitrogeno).forEach(key => questions.push({
                data: questionsNitrogeno[key]
             }));
            if(teamName === 'Ciclo del azufre') Object.keys(questionsAzufre).forEach(key => questions.push({
                data: questionsAzufre[key]
             }));
            if(teamName === 'Ciclo del fósforo') Object.keys(questionsFosforo).forEach(key => questions.push({
                data: questionsFosforo[key]
             }));
            if(teamName === 'Ciclo del oxígeno') Object.keys(questionsOxigeno).forEach(key => questions.push({
                data: questionsOxigeno[key]
             }));
        
            io.to(teamName).emit('sendQuestions', questions);
            
        });

        socket.on('selectedOption', function (username, teamName, option) {
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
            console.log('NUM:', num, 'Veces entrado...')
            teamsRooms.map(t => t.name === teamName 
                ? num === t.teammates.length ? io.to(teamName).emit('selectionsFinished') : null
                : null
            )
        });

        socket.on('mostSelected', function (selections, teamName) {
            console.log('MOST SELECTED')
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

            io.to(teamName).emit('compareResult', mostSelected)
        });

        socket.on('nextQuestion', function (teamName, questionIndex) {
            console.log('la siguiente pregunta es: ', questionIndex)
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
            teamsRooms.map(t => {
                if(t.name === teamName) t.score === parseInt(score) ? null : t.score = parseInt(score);
                allScores.push({team: t.name, score: t.score})
            })
            io.emit('sendAllTeamsScore', allScores)
        })

        socket.on('saveFinished', function () {
            usersFinished.push(socket.id);
            if(io.sockets.adapter.rooms.get('game') && usersFinished.length === io.sockets.adapter.rooms.get('game').size) {
                let highScoreTeams = []
                let highScore = 0;

                teamsRooms.map(t => {
                    if(t.score > highScore) {
                        highScore = t.score;
                        highScoreTeams.push(t.name)
                    }
                })
                io.emit('endGame', highScoreTeams);
            } 
        });

    });
}
    