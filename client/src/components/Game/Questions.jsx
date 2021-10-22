import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import { saveQuestionIndex } from '../../redux/actions-types/saveQuestionIndexActions';
import { selectedOption } from '../../redux/actions-types/selectedOptionActions';
import { saveAllSelections } from '../../redux/actions-types/saveAllSelectionsActions';

import socket from '../socket/socket';
import Question from './Question';

export default function Questions () {

    const dispatch = useDispatch()

    const [questions, setQuestions] = useState(undefined)
    const [i, setI] = useState()

    useEffect(() => {
        socket.emit('bringQuestions', localStorage.teamName)
        dispatch(saveQuestionIndex(0));
    }, [])

    useEffect(() => {
        socket.on('sendQuestions', (list) => {
            setQuestions(list)
        })
        return () => {socket.off("sendQuestions")}
    })

    useEffect(() => {
        socket.on('changeQuestion', (index) => {
            dispatch(saveQuestionIndex(index))
            dispatch(selectedOption(false))
            dispatch(saveAllSelections([]))
            setI(index)
            socket.emit('cleanSelections', localStorage.teamName)
        })
        return () => {socket.off("changeQuestion")}
    })

    useEffect(() => {

    }, [i])

    return (
        <div>
            Preguntas
            {
                questions
                ?   questions.map(q =>
                    <div key={questions.indexOf(q)} style={parseInt(localStorage.questionIndex) === questions.indexOf(q) ? null : {display: "none"}}>
                    {/* // <div key={questions.indexOf(q)} > */}
                        <Question 
                            actual={questions[questions.indexOf(q)].data} 
                            questionIndex={questions.indexOf(q)}
                        /> 
                    </div>
                    )
                : null
            }
            {console.log('TENEMOS QUE RERENDERIZAR')}
        </div>
    );

}