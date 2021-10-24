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
        <div>
            <p style={{textAlign: "center"}}>Resultados actuales</p>
            <div className={styles.results}>
                {
                    scores.length > 0 
                    ? scores.map(s => 
                        <div key={scores.indexOf(s)} className={styles.teamResult}>
                            <h3>{s.team}:</h3>
                            <h3>{s.score} puntos</h3>
                        </div>
                    )
                    : null
                }
            </div>
            <div>
                <p>Ganadores:</p>
                {
                    winner.length > 0 ?
                    winner.map(w => <h3 key={winner.indexOf(w)}>{w}</h3>)
                    : null
                }
            </div>
        </div>
    )
}