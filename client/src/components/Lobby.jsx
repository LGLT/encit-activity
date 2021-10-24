import React from 'react';
import TeamsList from './Teams/TeamsList';
import styles from './styles/Lobby.module.css'
import Chat from './Chat/Chat';

export default function Lobby () {

    return (
        <div>
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