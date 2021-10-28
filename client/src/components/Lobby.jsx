import React, { useEffect } from 'react';
import TeamsList from './Teams/TeamsList';
import styles from './styles/Lobby.module.css'
import Chat from './Chat/Chat';

import socket from './socket/socket';

export default function Lobby () {

    useEffect(() => {
            localStorage.removeItem('timerHost');
            localStorage.removeItem('questionIndex');
            localStorage.removeItem('gameStarted');
            // localStorage.removeItem('teamName');
            localStorage.removeItem('totalPoints');
            localStorage.removeItem('selectedOption');

            socket.emit('saveSocketName', localStorage.username)

            return () => {
                socket.off('saveSocketName');
            }
    }, [])

    return (
        <div className={styles.mainDiv}>
            <div className={styles.content}>
                <h2>¡Bienvenido(a), {localStorage.username}!</h2>
                <div className={styles.info}>
                    <p>El juego está por comenzar, ¡elige un equipo!</p>
                    <TeamsList />
                    <Chat lobby={true}/>
                </div>
            </div>
        </div>
    );
}