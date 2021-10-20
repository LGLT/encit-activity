import React, {useState, useEffect} from 'react';

import socket from '../socket/socket';
import Question from './Question';

export default function Questions () {

    const [questions, setQuestions] = useState(undefined)
    const [actualQuestion, setActualQuestion] = useState(0)

    useEffect(() => {
        socket.emit('bringQuestions', localStorage.teamName)
    }, [])

    useEffect(() => {
        socket.on('sendQuestions', (list) => {
            setQuestions(list)
        })
    })

    return (
        <div>
            Preguntas
            {
                questions
                ? 
                <Question actual={questions[actualQuestion].data} setActualQuestion={setActualQuestion} />
                : null
            }
        </div>
    );

}