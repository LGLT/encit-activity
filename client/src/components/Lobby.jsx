import React, { useEffect } from 'react';
import TeamsList from './Teams/TeamsList';
import styles from './styles/Lobby.module.css'
import Chat from './Chat/Chat';

import socket from './socket/socket';
import ghIcon from '../img/gh.png'
import inIcon from '../img/in.png'

export default function Lobby () {

    useEffect(() => {
            localStorage.removeItem('timerHost');
            localStorage.removeItem('questionIndex');
            localStorage.removeItem('gameStarted');
            // localStorage.removeItem('teamName');
            localStorage.removeItem('totalPoints');
            localStorage.removeItem('selectedOption');
            localStorage.removeItem('organicStart');

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
                <div className={styles.credits}>
                    <p className={styles.name}>Desarrollado por Leonardo López</p>
                    <div className={styles.links}>
                    <a style={{display: 'contents'}} href="https://www.linkedin.com/in/leonardoglopez/"><img src={inIcon} alt="LinkedIn" style={{width: '15%'}}/></a>
                    <a style={{display: 'contents'}} href="https://github.com/LGLT"><img src={ghIcon} alt="GitHub" style={{width: '15%'}}/></a>
                    </div>
                </div>
            </div>
        </div>
    );
}