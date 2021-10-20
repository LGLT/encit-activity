import React from 'react';
import {useDispatch} from 'react-redux'

import { selectedOption } from '../../redux/actions-types/selectedOptionActions';
import Selections from './Selections';
import socket from '../socket/socket';

export default function Question ({actual, setActualQuestion}) {
    const dispatch = useDispatch();

    const selectOption = (event) => {
        event.preventDefault();
        if(!localStorage.selectedOption){
            dispatch(selectedOption(true))
            socket.emit('selectedOption', localStorage.username, localStorage.teamName, event.target.innerText);
        }
        else return
    }

    return (
        <div>
            {console.log(actual)}
            <h2>{actual.text}</h2>
            <h3>Respuesta correcta: {actual.answer}</h3>
            <h4>Opciones: </h4>
            <div>
                {
                    actual.options.map(o => 
                    <div key={actual.options.indexOf(o)}>
                        <p onClick={(event) => selectOption(event)} style={{cursor: 'pointer'}}>{o}</p>
                    </div>
                    )
                }
            </div>
            <Selections />
        </div>
    );

}