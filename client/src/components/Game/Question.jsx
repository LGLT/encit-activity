import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import styles from './styles/Question.module.css'

import { selectedOption } from '../../redux/actions-types/selectedOptionActions';
import { savePoints } from '../../redux/actions-types/savePointsActions';

import Modal from '../Modal'
import Selections from './Selections';
import socket from '../socket/socket';

export default function Question ({actual, questionIndex}) {
    const dispatch = useDispatch();

    const [mostSelected, setMostSelected] = useState(undefined);
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        if(parseInt(localStorage.questionIndex) === questionIndex) {
            socket.on('compareResult', (mostSelected) => {
                if(mostSelected === actual.answer) dispatch(savePoints(localStorage.totalPoints ? parseInt(localStorage.totalPoints) + 1 : 1)) 
                setMostSelected(mostSelected);
                setModalState(!modalState)
                socket.emit('nextQuestion', localStorage.teamName, parseInt(localStorage.questionIndex) + 1)
            });
            return () => {
                socket.off("compareResult");
                socket.off('nextQuestion');
            }
        }
    })
    
    const selectOption = (event) => {
        event.preventDefault();
        if(!localStorage.selectedOption || localStorage.selectedOption === 'false'){
            dispatch(selectedOption(true))
            socket.emit('selectedOption', localStorage.username, localStorage.teamName, event.target.innerText);
        }
        return () => {
            socket.off('selectedOption');
        }
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
            <div>{mostSelected ? console.log('MOST SELECTED', mostSelected) :console.log(questionIndex)}
                {
                    mostSelected &&   
                        mostSelected === actual.answer 
                        ? 
                        <Modal state={modalState} setState={setModalState}> 
                            <h1>¡Correcto!</h1>
                            <p>¡Felicidades! La opción votada es correcta.</p>
                        </Modal>
                        : 
                        <Modal state={modalState} setState={setModalState}> 
                            <h1>¡Estuvo cerca!</h1>
                            <p>Lamentablemente, la opción votada es incorrecta.</p>
                        </Modal>
                }
            </div>
        </div>
    );

}