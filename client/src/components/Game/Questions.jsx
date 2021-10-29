/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import { saveQuestionIndex } from '../../redux/actions-types/saveQuestionIndexActions';
import { selectedOption } from '../../redux/actions-types/selectedOptionActions';
import { saveAllSelections } from '../../redux/actions-types/saveAllSelectionsActions';

import socket from '../socket/socket';
import Question from './Question';
import Results from './Results';

export default function Questions () {

    const dispatch = useDispatch()

    const [questions, setQuestions] = useState(undefined)
    const [i, setI] = useState()

    useEffect(() => {
        socket.emit('bringQuestions', localStorage.teamName)
        dispatch(saveQuestionIndex(0));
        
        return () => {
            socket.off('bringQuestions');
        }
    }, [])

    useEffect(() => {
        socket.on('sendQuestions', (list) => {
            setQuestions(list)
        })
        return () => {
            socket.off("sendQuestions");
        }
    })

    useEffect(() => {
        socket.on('changeQuestion', (index) => {
            dispatch(saveQuestionIndex(index))
            dispatch(selectedOption(false))
            dispatch(saveAllSelections([]))
            setI(index)
            socket.emit('cleanSelections', localStorage.teamName)
        })
        
        socket.on('timeOver', () => {
            localStorage.setItem('questionIndex', 6);
            setI(6)
        })

        return () => {
            socket.off("changeQuestion");
            socket.off('cleanSelections');
            socket.off('timeOver');
        }
    })

    useEffect(() => {

    }, [i])

    return (
        <div>
            {
                questions
                ?   questions.map(q =>
                    <div key={questions.indexOf(q)} style={parseInt(localStorage.questionIndex) === questions.indexOf(q) ? null : {display: "none"}}>
                        <Question 
                            actual={questions[questions.indexOf(q)].data} 
                            questionIndex={questions.indexOf(q)}
                        /> 
                    </div>
                    )
                : null
            }
            <div>
                {localStorage.questionIndex > 4 && <Results />}
            </div>
        </div>
    );

}