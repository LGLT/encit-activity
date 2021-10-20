import React, {useState, useEffect, useRef} from 'react';

import socket from '../socket/socket'

export default function Chat () {
    const divRef = useRef(null);

    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([])

    useEffect(() => {
        socket.on('sendMessage', (message) => {
            setMsgList([...msgList, message]);
        })

        return () => { socket.off("sendMessage"); }
    }, [msgList])

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    })
    
    const submit = (event) => {
        event.preventDefault();
        socket.emit('message', localStorage.username, msg, localStorage.teamName);
        setMsg("");
    }

    return (
        <div>
            <div>
                {msgList.map(m => ( <div key={msgList.indexOf(m)}>{m}</div> ))}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <input value={msg} type="text" placeholder={'Mensaje...'} onChange={event => setMsg(event.target.value)} ></input>
            </form>
        </div>
    )
}