import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import styles from './styles/FormUsername.module.css'

import socket from './socket/socket'
import { signUp } from '../redux/actions-types/signUpActions';

export default function FormUsername () {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")

    const createUsername = (event) => {
        event.preventDefault();
        dispatch(signUp(username));
        socket.emit('createSocketName', username)
        return () => {
            socket.off('createSocketName')
        }
    }

    return (
        <div>
            <form onSubmit={createUsername} className={styles.form}>
                <input 
                    type="text" onChange={(event) => setUsername(event.target.value)} 
                    placeholder={'Nombre...'}
                    className={styles.input}
                />
            </form>
        </div>
    );
}