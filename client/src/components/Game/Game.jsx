import React, { useEffect } from 'react';
import {useDispatch, useStore} from 'react-redux'
import styles from './styles/Game.module.css'

import { saveQuestionIndex } from '../../redux/actions-types/saveQuestionIndexActions';
import Chat from '../Chat/Chat';
import socket from '../socket/socket'
import Points from './Points';
import Questions from './Questions';
import Results from './Results';
import Timer from './Timer';
import { useState } from 'react';

export default function Game () {

    const dispatch = useDispatch();

    const [newCircleStyle, setNewCircleStyle] = useState(false)

    const roomSub = () => { socket.emit('roomSub', localStorage.teamName) }

    useEffect(() => {
        socket.emit('joinToGame')
        return () => {
            socket.off('joinToGame');
        }
    }, [])

    useEffect(() => {
        socket.on('sendAllTeamsScore', (allScores) => {
            setNewCircleStyle(true)
        })
        return () => {
            socket.off('sendAllTeamsScore')
        }  
    })

    return (
        <div className={styles.mainDiv}>
            {roomSub()}
            <div className={styles.bar}>
                <Timer />
                <Points />
            </div>
            <div className={styles.questionSection}>
                <Questions />
                <Chat />
            </div>
            {
                newCircleStyle
                ?
                <div className={
                    localStorage.teamName === 'Ciclo hidrológico' ? styles.circleEffect1_2 :
                    localStorage.teamName === 'Ciclo del carbono' ? styles.circleEffect2_2 :
                    localStorage.teamName === 'Ciclo del nitrógeno' ? styles.circleEffect3_2 :
                    localStorage.teamName === 'Ciclo del azufre' ? styles.circleEffect4_2:
                    localStorage.teamName === 'Ciclo del fósforo' ? styles.circleEffect5_2 :
                    localStorage.teamName === 'Ciclo del oxígeno' ? styles.circleEffect6_2 : null
                }> </div>
                :
                <div className={
                    localStorage.teamName === 'Ciclo hidrológico' ? styles.circleEffect1 :
                    localStorage.teamName === 'Ciclo del carbono' ? styles.circleEffect2 :
                    localStorage.teamName === 'Ciclo del nitrógeno' ? styles.circleEffect3 :
                    localStorage.teamName === 'Ciclo del azufre' ? styles.circleEffect4:
                    localStorage.teamName === 'Ciclo del fósforo' ? styles.circleEffect5 :
                    localStorage.teamName === 'Ciclo del oxígeno' ? styles.circleEffect6 : null
                }> </div>
            }
        </div>
    )
}