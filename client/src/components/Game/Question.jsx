import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import styles from './styles/Question.module.css'

import { selectedOption } from '../../redux/actions-types/selectedOptionActions';
import { savePoints } from '../../redux/actions-types/savePointsActions';

import Selections from './Selections';
import socket from '../socket/socket';

export default function Question ({actual, questionIndex}) {
    const dispatch = useDispatch();

    const [mostSelected, setMostSelected] = useState(undefined);

    useEffect(() => {
        if(parseInt(localStorage.questionIndex) === questionIndex) {
            socket.on('compareResult', (mostSelected) => {
                if(mostSelected === actual.answer) dispatch(savePoints(localStorage.totalPoints ? parseInt(localStorage.totalPoints) + 1 : 1)) 
                setMostSelected(mostSelected)
                socket.emit('nextQuestion', localStorage.teamName, parseInt(localStorage.questionIndex) + 1)
            });
        }
        return () => {socket.off("compareResult")}
    })
    
    const selectOption = (event) => {
        event.preventDefault();
        if(!localStorage.selectedOption || localStorage.selectedOption === 'false'){
            dispatch(selectedOption(true))
            socket.emit('selectedOption', localStorage.username, localStorage.teamName, event.target.innerText);
            socket.emit('teammates', localStorage.teamName)
        }
        else return
        return () => {socket.off('selectedOption'); socket.off('teammates');}
    }

    return (
        <div className={styles.mainDiv}>
            <h2 className={styles.questionTittle}>{actual.text}</h2>
            <div className={styles.options}>
                {
                    actual.options.map(o => 
                    <div key={actual.options.indexOf(o)}>
                        <p onClick={(event) => selectOption(event)} className={styles.singleOption}>{o}</p>
                    </div>
                    )
                }
            </div>
            <Selections questionIndex={questionIndex} />
            <div>
                {
                    mostSelected 
                    ?   mostSelected === actual.answer 
                        ? <h3>LA RESPUESTA ES CORRECTA</h3>
                        : <h3>La respuesta es incorrecta :(</h3>
                    :   null 
                }
            </div>
        </div>
    );

}