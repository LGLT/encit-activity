import React, { useEffect, useState } from 'react';

import socket from '../socket/socket';

export default function Results () {
    const [scores, setScores] = useState([])

    useEffect(() => {
        socket.emit('bringAllTeamsScore', localStorage.totalPoints, localStorage.teamName)
    }, [])

    useEffect(() => {
        socket.on('sendAllTeamsScore', (allScores) => {
            console.log(allScores)
            setScores(allScores)
        })
        return () => { socket.off('sendAllTeamsScore'); }
    })

    return (
        <div>
            <p>Resultados actuales</p>
            {
                scores.length > 0 
                ? scores.map(s => 
                    <div key={scores.indexOf(s)}>
                        <h3>{s.team}: {s.score}</h3>
                    </div>
                )
                : null
            }
        </div>
    )
}