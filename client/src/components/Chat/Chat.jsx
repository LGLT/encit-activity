import React, {useState, useEffect, useRef} from 'react';
import styles from './styles/Chat.module.css'

import socket from '../socket/socket'

export default function Chat ({lobby}) {

    const divRef = useRef(null);

    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([])

    useEffect(() => {
        if(lobby) socket.emit('joinToChatLobby');
    }, [lobby])

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
        if(lobby) socket.emit('messageLobby', localStorage.username, msg, localStorage.teamName);
        else socket.emit('message', localStorage.username, msg, localStorage.teamName);
        setMsg("");
    }

    return (
        <div className={lobby ? styles.lobbyMainDiv : styles.mainDiv}>
            <div className={lobby ? styles.lobbyChat : styles.chat}>
                {msgList.map(m => ( 
                    <div key={msgList.indexOf(m)} className={lobby ? styles.lobbyMsg : styles.msg}>
                        <p 
                            className={
                                m.teamName === 'Ciclo hidrológico' ? styles.color1 :
                                m.teamName === 'Ciclo del carbono' ? styles.color2 :
                                m.teamName === 'Ciclo del nitrógeno' ? styles.color3 :
                                m.teamName === 'Ciclo del azufre' ? styles.color4:
                                m.teamName === 'Ciclo del fósforo' ? styles.color5 :
                                m.teamName === 'Ciclo del oxígeno' ? styles.color6 : styles.colorDefault
                            }
                        >
                            {m.username}:</p>
                        <p>{m.msg}</p>
                    </div> 
                ))}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <input 
                    value={msg} 
                    type="text" 
                    placeholder={'Mensaje...'} 
                    onChange={event => setMsg(event.target.value)}
                    className={lobby ? styles.lobbyInput : styles.input}
                ></input>
            </form>
        </div>
    )
}