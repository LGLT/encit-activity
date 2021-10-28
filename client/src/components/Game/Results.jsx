import React, { useEffect, useState } from 'react';
import styles from './styles/Results.module.css'
import {Redirect} from 'react-router-dom'

import socket from '../socket/socket';

export default function Results () {

    const [scores, setScores] = useState([])
    const [winner, setWinner] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [onceRestart, setOnceRestart] = useState(0);

    useEffect(() => {
        socket.emit('bringAllTeamsScore', localStorage.totalPoints, localStorage.teamName)
        socket.emit('saveFinished');
        
        return () => {
            socket.off('bringAllTeamsScore');
            socket.off('saveFinished');
        }
    }, [])

    useEffect(() => {
        socket.on('sendAllTeamsScore', (allScores) => {
            setScores(allScores)
        });

        socket.on('endGame', (winner) => {
            setWinner(winner)
        });

        socket.on('cleanLocalStorage', () => {
            localStorage.removeItem('timerHost');
            localStorage.removeItem('questionIndex');
            localStorage.removeItem('gameStarted');
            localStorage.removeItem('teamName');
            localStorage.removeItem('totalPoints');
            localStorage.removeItem('selectedOption');
            setRedirect(true)
        });

        return () => { 
            socket.off('sendAllTeamsScore'); 
            socket.off('endGame');
            socket.off('cleanLocalStorage');
        }
    })

    const restartGame = () => {
        if(onceRestart === 0) {
            setOnceRestart(1)
            setTimeout(() => {
                socket.emit('restartGame', localStorage.teamName);
            }, 20000);
        }

        return () => {
            socket.off('restartGame');
        }
    }

    return (
        <div className={styles.mainDiv}>
            <p style={{textAlign: "center"}}>Resultados actuales</p>
            <div className={styles.results}>
                {
                    scores.length > 0 
                    ? scores.map(s => 
                        <div 
                            key={scores.indexOf(s)} 
                            className={
                                scores.indexOf(s) === 0 ? styles.teamTittle0 :
                                scores.indexOf(s) === 1 ? styles.teamTittle1 : 
                                scores.indexOf(s) === 2 ? styles.teamTittle2 : 
                                scores.indexOf(s) === 3 ? styles.teamTittle3 : 
                                scores.indexOf(s) === 4 ? styles.teamTittle4 : 
                                scores.indexOf(s) === 5 ? styles.teamTittle5 : null
                            }
                        >
                            <h3>{s.team}:</h3>
                            <h3>{s.score} puntos</h3>
                        </div>
                    )
                    : null
                }
            </div>
            <div>
                {
                    winner.length > 0 
                    ?
                    <div className={styles.winnersDiv}>
                        <p>Ganadores:</p>
                        {winner.map(w => <h2 key={winner.indexOf(w)}>{w}</h2>)}
                        { restartGame() }
                    </div>
                    :
                    <h3 style={{color:'white', textAlign: 'center'}}>Espera mientras el resto de jugadores terminan...</h3>
                }
            </div>
            {redirect && <Redirect to='/'/>}
        </div>
    )
}