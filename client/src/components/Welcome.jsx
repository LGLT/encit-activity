import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import FormUsername from './FormUsername';

export default function Welcome () {

    var store = useSelector(store => store);
    console.log('STORE', store)
    console.log('STORAGELOCA:', localStorage.username)

    return (
        <div>
            {localStorage.username ? <Redirect to="/lobby" /> : null}
            
            <h2>¡Bienvenido a [NAME]!</h2>
            <p>Ingresa tu nombre y apellido, luego presiona ENTER</p>
            <FormUsername />
        </div>
    );
}