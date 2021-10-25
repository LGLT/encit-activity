import React, { useEffect, useState } from 'react';
import styles from './styles/Results.module.css'

import socket from '../socket/socket';

export default function Results () {

    const [scores, setScores] = useState([])
    const [winner, setWinner] = useState([])

    useEffect(() => {
        socket.emit('bringAllTeamsScore', localStorage.totalPoints, localStorage.teamName)
        socket.emit('saveFinished');
    }, [])

    useEffect(() => {
        socket.on('sendAllTeamsScore', (allScores) => {
            console.log(allScores)
            setScores(allScores)
        })

        socket.on('endGame', (winner) => {
            setWinner(winner)
        })

        return () => { 
            socket.off('sendAllTeamsScore'); 
            socket.off('endGame')
        }
    })

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
                    winner.length > 0 &&
                    <div className={styles.winnersDiv}>
                        <p>Ganadores:</p>
                        {winner.map(w => <h3 key={winner.indexOf(w)}>{w}</h3>)}
                    </div>
                }
            </div>
        </div>
    )
}