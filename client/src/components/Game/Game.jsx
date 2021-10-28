/* eslint-disable no-unused-vars */
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
import LeftButton from './LeftButton';

export default function Game () {

    const dispatch = useDispatch();

    const [newCircleStyle, setNewCircleStyle] = useState(false)

    const roomSub = () => { 
        socket.emit('roomSub', localStorage.teamName, localStorage.organicStart);
        
        return () => {
            socket.off('roomSub');
        }
    }

    useEffect(() => {
        socket.emit('joinToGame', localStorage.username);
        socket.emit('joinToTeamIfRefresh', localStorage.username, localStorage.teamName);
        socket.emit('savesocketname');
        return () => {
            socket.off('joinToGame');
            socket.off('joinToTeamIfRefresh');
        }
    }, [])

    useEffect(() => {
        socket.on('sendAllTeamsScore', (allScores) => {
            setNewCircleStyle(true)
        })
        socket.on('updateQuestionIndex', (index) => {
            localStorage.setItem('questionIndex', index);
        })
        return () => {
            socket.off('sendAllTeamsScore');
            socket.off('updateQuestionIndex');
        }  
    })

    return (
        <div className={styles.mainDiv}>
            <div className={styles.content}>
                {roomSub()}
                <div className={styles.bar}>
                    <Timer />
                    <LeftButton />
                    <Points />
                </div>
                <div className={styles.questionSection}>
                    <Questions />
                    <Chat />
                </div>
            </div>
        </div>
    )
}