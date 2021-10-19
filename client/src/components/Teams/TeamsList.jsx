import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import socket from '../socket/socket'
import { joinToTeam } from '../../redux/actions-types/joinToTeamActions';

export default function TeamsList () {
    const dispatch = useDispatch();

    const [roomsData, setRoomsData] = useState([])

    const joinToTeamFunction = (event) => {
        let teamName = event.target.innerText;
        console.log(teamName);
        socket.emit('joinToTeam', teamName, localStorage.username, localStorage.teamName);
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
    })


    return (
        <div>
            <h6>Lista de equipos</h6>
            {console.log('ROOMSDATA:', roomsData)}
            <div>
                { roomsData.length > 0
                    ? 
                    roomsData.map( r => 
                        (<div key={r.name}>
                            <h4 onClick={(event) => joinToTeamFunction(event)} style={{cursor: 'pointer'}}>{r.name}</h4>
                            <p>Jugadores actuales:</p>
                            { r.teammates.length > 0 
                                ?
                                <div> {r.teammates.map( t => <p key={t}>{t}</p> )} </div>
                                : null
                            }
                        </div>)
                    )
                    : null
                }
            </div>
            {   roomsData.length > 0 ?
                    roomsData[0].teammates.length === 1 && 
                    roomsData[1].teammates.length === 1 && 
                    roomsData[2].teammates.length === 1 && 
                    roomsData[3].teammates.length === 1 && 
                    roomsData[4].teammates.length === 1 && 
                    roomsData[5].teammates.length === 1 
                    ? <Redirect to="/game" />
                    : null
                : null
            }
        </div>
    )
}