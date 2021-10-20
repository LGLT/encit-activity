import React, { useEffect } from 'react';

import Chat from '../Chat/Chat';
import socket from '../socket/socket'
import Questions from './Questions';
import Timer from './Timer';

export default function Game () {

    const roomSub = () => { socket.emit('roomSub', localStorage.teamName) }

    return (
        <div>
            {roomSub()}
            <Chat />
            <Timer />
            <Questions />
        </div>
    )
}