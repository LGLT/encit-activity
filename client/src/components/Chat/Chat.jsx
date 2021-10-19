import React, {useState, useEffect, useRef} from 'react';

import socket from '../socket/socket'

export default function Chat () {
    const divRef = useRef(null);

    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([])

    useEffect(() => {
        socket.on('sendMessage', (message) => {
            // console.log('ENTRAMOS A MENSAJES')
            console.log('Mensaje:', message);
            // setMsgList([...msgList, message]);
            // console.log(msgList)
        })

        return () => { socket.off("sendMessage"); }
    }, [msgList])

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    })
    
    const submit = (event) => {
        event.preventDefault();
        console.log(msg)
        socket.emit('message', localStorage.username, msg, localStorage.teamName);
        setMsg("");
    }

    return (
        <div>
            <div>
                {msgList.map((m, i) => ( <div key={i}><div>{m.name}</div><div>{m.msg}</div></div> ))}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <input type="text" placeholder={'Mensaje...'} onChange={event => setMsg(event.target.value)} ></input>
            </form>
        </div>
    )
}