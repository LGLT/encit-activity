import React from 'react';
import {useHistory} from 'react-router-dom'

import socket from '../socket/socket';
import styles from './styles/LeftButton.module.css';

export default function LeftButton () {
    const history = useHistory();

    const leftGame = () => {
        socket.emit('leftGame', localStorage.username, localStorage.teamName);
        localStorage.removeItem('timerHost');
        localStorage.removeItem('questionIndex');
        localStorage.removeItem('gameStarted');
        localStorage.removeItem('teamName');
        localStorage.removeItem('totalPoints');
        localStorage.removeItem('selectedOption');
        history.push('/lobby');
        return () => {
            socket.off('leftGame');
        }
    }

    return (
        <div style={{alignSelf: 'center'}}>
            <button onClick={() => leftGame()} className={styles.btn}>Salir</button>
        </div>
    )
}