/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import styles from './styles/Timer.module.css'

import { gameStarted } from '../../redux/actions-types/gameStartedActions';
import { saveTimerHost } from '../../redux/actions-types/saveTimerHostActions';
import socket from '../socket/socket';

export default function Timer () {
    const dispatch = useDispatch();

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [started, setStarted] = useState(false);

    const[timerHost, setTimerHost] = useState("");

    let timer;

    useEffect(() => {
        socket.emit('timerHost', localStorage.username, localStorage.organicStart);

        return () => {
            socket.off('timerHost');
        }
    }, [])

    useEffect(() => {
        if(localStorage.gameStarted === 'true' && localStorage.timerHost === localStorage.username){
            timer = setInterval(() => {
                socket.emit('getTime');
            }, 1000);
            return () => clearInterval(timer);
        }
        else{
            socket.emit('startCount');
            dispatch(gameStarted(true));
        }

        return () => {
            socket.off('startCount');
        }
    })

    useEffect(() => {
        socket.on('setStartCount', () => {
            setStarted(true)
        })

        socket.on('sendTime', (minutes, seconds) => {
            setMinutes(minutes);
            setSeconds(seconds);
        })

        socket.on('saveTimerHost', (host) => {
            // console.log('EL HOST ES:', host)
            dispatch(saveTimerHost(host))
        })

        return () => {
            socket.off('setStartCount');
            socket.off('sendTime');
            socket.off('saveTimerHost')
        }
        
    })

    return (
        <div className={styles.mainDiv}>
            <p>Tiempo restante:</p>
            <p>{minutes}:{seconds}</p>
        </div>
    );
}