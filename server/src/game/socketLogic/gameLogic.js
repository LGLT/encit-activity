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

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

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

            teamsRooms.map(t => t.name === teamName 
                ? num === t.teammates.length ? socket.emit('selectionsFinished') : null
                : null
            )
        });

    });
}
    