import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import styles from './styles/TeamsList.module.css'

import socket from '../socket/socket'
import { gameStarted } from '../../redux/actions-types/gameStartedActions';
import { joinToTeam } from '../../redux/actions-types/joinToTeamActions';
import { saveTimerHost } from '../../redux/actions-types/saveTimerHostActions';

export default function TeamsList () {
    const dispatch = useDispatch();

    const [roomsData, setRoomsData] = useState([])

    const joinToTeamFunction = (event) => {
        let teamName = event.target.innerText;
        console.log(teamName);
        socket.emit('joinToTeam', teamName, localStorage.username, localStorage.teamName);
    }
    
    const startGame = () => {
        dispatch(gameStarted(true))
        return <Redirect to="/game" />
    }

    useEffect(() => {
        socket.emit('bringRooms');
    }, [])

    useEffect(() => {
        socket.on('sendRooms', (teamsRooms) => {
            setRoomsData(teamsRooms);
        })

        socket.on('addTeamLocalStorage', (teamName) => {
            dispatch(joinToTeam(teamName));
        })

        socket.on('saveTimerHost', (host) => {
            console.log('ESTE ES EL HOST:', host)
            dispatch(saveTimerHost(host))
        })

        return () => {
            socket.off("sendRooms"); 
            socket.off("addTeamLocalStorage");
            socket.off("saveTimerHost");
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
                {   roomsData.length > 0 ?
                        // roomsData[0].teammates.length === 1 && 
                        // roomsData[1].teammates.length === 1 && 
                        // roomsData[2].teammates.length === 1 && 
                        // roomsData[3].teammates.length === 1 && 
                        // roomsData[4].teammates.length === 1 && 
                        // roomsData[5].teammates.length === 1
                        roomsData[0].teammates.length === 1 || 
                        roomsData[1].teammates.length === 1 || 
                        roomsData[2].teammates.length === 1 || 
                        roomsData[3].teammates.length === 1 || 
                        roomsData[4].teammates.length === 1 || 
                        roomsData[5].teammates.length === 1
                        ? startGame()
                        : null
                    : null
                }
            </div>
        </div>
    )
}