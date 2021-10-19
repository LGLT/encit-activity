import React from 'react';
import TeamsList from './Teams/TeamsList';

export default function Lobby () {

    return (
        <div>
            <h2>¡Bienvenido, {localStorage.username}!</h2>
            <p>El juego está por comenzar, ¡elige un equipo!</p>
            <TeamsList />
        </div>
    );
}