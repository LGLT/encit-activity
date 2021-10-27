import React from 'react';
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import FormUsername from './FormUsername';

import styles from './styles/Welcome.module.css'

export default function Welcome () {

    var store = useSelector(store => store);
    console.log('STORE', store)
    console.log('STORAGELOCA:', localStorage.username)

    return (
        <div className={styles.mainDiv}>
            {localStorage.username ? <Redirect to="/lobby" /> : null}
            <div className={styles.contentBox}>
                <div className={styles.content}>
                    <h2>¡Bienvenido a Bacteritas!</h2>
                    <p>Ingresa tu nombre y apellido, luego presiona ENTER</p>
                    <FormUsername />
                </div>
            </div>
            <div className={styles.end}> </div>
        </div>
    );
}