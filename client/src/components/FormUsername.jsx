import React, {useState} from 'react';
import {useDispatch} from 'react-redux'

import { signUp } from '../redux/actions-types/signUpActions';

export default function FormUsername () {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")

    const createUsername = (event) => {
        event.preventDefault();
        console.log(username)
        dispatch(signUp(username));
    }

    return (
        <div>
            <form onSubmit={createUsername}>
                <input type="text" onChange={(event) => setUsername(event.target.value)}/>
            </form>
        </div>
    );
}