import React, {useEffect, useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import styles from './styles/TeamsList.module.css'

import socket from '../socket/socket'
import { gameStarted } from '../../redux/actions-types/gameStartedActions';
import { joinToTeam } from '../../redux/actions-types/joinToTeamActions';
import { saveTimerHost } from '../../redux/actions-types/saveTimerHostActions';

export default function TeamsList () {
    const dispatch = useDispatch();
    const history = useHistory();

    const [roomsData, setRoomsData] = useState([])

    const joinToTeamFunction = (event) => {
        let teamName = event.target.innerText;
        socket.emit('joinToTeam', teamName, localStorage.username, localStorage.teamName);
        if(localStorage.teamName === teamName) localStorage.removeItem('teamName');

        return () => {
            socket.off('joinToTeam')
        }
    }
    
    const startGame = () => {
        dispatch(gameStarted(true))
        localStorage.setItem('organicStart', true);
        return <Redirect to="/game" />
    }

    const startGameAdmin = (event) => {
        event.preventDefault();
        if(event.target.nodeName === 'BUTTON') socket.emit('BacteritasAdmin');

        return () => {
            socket.off('BacteritasAdmin');
        }
    }

    useEffect(() => {
        socket.emit('bringRooms');

        return () => {
            socket.off('bringRooms');
        }
    }, [])

    useEffect(() => {
        socket.on('sendRooms', (teamsRooms) => {
            if(history.location.pathname === '/lobby' && localStorage.timerHost) localStorage.removeItem('timerHost')
            setRoomsData(teamsRooms);
        })

        socket.on('addTeamLocalStorage', (teamName) => {
            dispatch(joinToTeam(teamName));
        })

        socket.on('saveTimerHost', (host) => {
            dispatch(saveTimerHost(host))
        })

        socket.on('gameInCourse', (status) => {
            if(status === 'restart') socket.emit('restartGame', localStorage.teamName);
            else alert('Ya hay una partida en curso. Vuelve m??s tarde.')
        })

        socket.on('redirectToGame', () => {
            dispatch(gameStarted(true));
            if(localStorage.teamName){
                localStorage.setItem('organicStart', true);
                return history.push('/game')
            } else {
                alert('Ya ha iniciado una partida.');
                setRoomsData([])
            }
        })

        return () => {
            socket.off("sendRooms"); 
            socket.off("addTeamLocalStorage");
            socket.off("saveTimerHost");
            socket.off("gameInCourse");
            socket.off("redirectToGame");
            socket.off('sendRestart');
            socket.off('restartGame');
        }
        
    })


    return (
        <div>
            <div className={styles.content}>
                <div className={styles.teamsList}>
                    { roomsData.length > 0
                        ? 
                        roomsData.map( r => 
                            (<div key={r.name} className={styles.teamBorder}>
                                <div className={styles.team}>
                                    <h4 
                                        onClick={(event) => joinToTeamFunction(event)} 
                                        className={
                                            roomsData.indexOf(r) === 0 ? styles.teamTittle0 :
                                            roomsData.indexOf(r) === 1 ? styles.teamTittle1 : 
                                            roomsData.indexOf(r) === 2 ? styles.teamTittle2 : 
                                            roomsData.indexOf(r) === 3 ? styles.teamTittle3 : 
                                            roomsData.indexOf(r) === 4 ? styles.teamTittle4 : 
                                            roomsData.indexOf(r) === 5 ? styles.teamTittle5 : null
                                        }
                                    >
                                            {r.name}
                                    </h4>
                                    <div className={styles.players}>
                                        <p className={styles.p_actualPlayers}>Jugadores actuales:</p>
                                        { r.teammates.length > 0 
                                            ?
                                            <div> {r.teammates.map( t => <p key={t}>{t}</p> )} </div>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>)
                        )
                        : null
                    }
                </div>
                {
                    localStorage.username === 'BacteritasAdmin'
                    && <button onClick={(event) => {startGameAdmin(event)}}>Start game</button>
                }
                {   roomsData.length > 0 &&
                        roomsData[0].teammates.length >= 7 && 
                        roomsData[1].teammates.length >= 7 && 
                        roomsData[2].teammates.length >= 7 && 
                        roomsData[3].teammates.length >= 7 && 
                        roomsData[4].teammates.length >= 7 && 
                        roomsData[5].teammates.length >= 7 &&
                        startGame()
                }
            </div>
        </div>
    )
}