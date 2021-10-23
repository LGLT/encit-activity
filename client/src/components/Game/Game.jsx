import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import styles from './styles/Game.module.css'

import { saveQuestionIndex } from '../../redux/actions-types/saveQuestionIndexActions';
import Chat from '../Chat/Chat';
import socket from '../socket/socket'
import Points from './Points';
import Questions from './Questions';
import Results from './Results';
import Timer from './Timer';

export default function Game () {
    const dispatch = useDispatch();

    const roomSub = () => { socket.emit('roomSub', localStorage.teamName) }

    useEffect(() => {

    }, [])

    return (
        <div className={styles.mainDiv}>
            {roomSub()}
            <div className={styles.bar}>
                <Timer />
                <Points />
            </div>
            <div className={styles.questionSection}>
                <Questions />
                <div style={localStorage.questionIndex > 4 ? {display:"none"} : null}>
                    <Chat />
                </div>
            </div>
            <div className={
                localStorage.teamName === 'Ciclo hidrológico' ? styles.circleEffect1 :
                localStorage.teamName === 'Ciclo del carbono' ? styles.circleEffect2 :
                localStorage.teamName === 'Ciclo del nitrógeno' ? styles.circleEffect3 :
                localStorage.teamName === 'Ciclo del azufre' ? styles.circleEffect4:
                localStorage.teamName === 'Ciclo del fósforo' ? styles.circleEffect5 :
                localStorage.teamName === 'Ciclo del oxígeno' ? styles.circleEffect6 : null
            }> </div>
        </div>
    )
}