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
        socket.emit('timerHost', localStorage.username);
    }, [])

    useEffect(() => {
        if(localStorage.gameStarted === 'true' && localStorage.timerHost === localStorage.username){
            timer = setInterval(() => {
                socket.emit('getTime');
            }, 1000);
            return () => clearInterval(timer);
        }
        else{
            // console.log('ESTAMOS EN FALSE')
            socket.emit('startCount');
            dispatch(gameStarted(true));
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
            console.log('ESTE ES EL HOST:', host)
            dispatch(saveTimerHost(host))
        })
        
    })

    return (
        <div className={styles.mainDiv}>
            <p>Tiempo restante:</p>
            <p>{minutes}:{seconds}</p>
        </div>
    );
}