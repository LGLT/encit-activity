import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux'

import { saveQuestionIndex } from '../../redux/actions-types/saveQuestionIndexActions';
import Chat from '../Chat/Chat';
import socket from '../socket/socket'
import Points from './Points';
import Questions from './Questions';
import Timer from './Timer';

export default function Game () {
    const dispatch = useDispatch();

    const roomSub = () => { socket.emit('roomSub', localStorage.teamName) }

    useEffect(() => {

    }, [])

    return (
        <div>{console.log('ENTRAMOS A GAME')}
            {roomSub()}
            <Chat />
            <Timer />
            <Points />
            <Questions />
        </div>
    )
}