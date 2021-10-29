/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import socket from '../socket/socket';
import { saveAllSelections } from '../../redux/actions-types/saveAllSelectionsActions';
import styles from './styles/Selections.module.css'

export default function Selections ({questionIndex}) {
    const dispatch = useDispatch();

    let allSelections = useSelector(store => store.saveAllSelections.allSelections);

    useEffect(() => {
        if(parseInt(localStorage.questionIndex) === questionIndex) {
            socket.on('showSelectedOption', (selections) => {
                dispatch(saveAllSelections(selections))
            });
    
            socket.on('selectionsFinished', () => {
                socket.emit('mostSelected', allSelections, localStorage.teamName);
            });

            socket.on('reviewSelections', () => {
                socket.emit('checkAllSelections', allSelections.length, localStorage.teamName)
            })
        }
        return () => {
            socket.off("showSelectedOption");
            socket.off("selectionsFinished");
            socket.off('mostSelected'); 
            socket.off('reviewSelections');
            socket.off('checkAllSelections');
        }
    });

    
    useEffect(() => {
        if(parseInt(localStorage.questionIndex) === questionIndex) {
            socket.emit('checkAllSelections', allSelections.length, localStorage.teamName)
        }

        return () => {
            socket.off('checkAllSelections');
        }
    }, [allSelections]);

    return (
        <div>
            {
            allSelections.length > 0 ?
                <div className={styles.selections}>
                    {
                    allSelections.map(s => 
                        <div key={allSelections.indexOf(s)}>
                            <p>{s.name} ha votado: {s.option}</p>
                        </div>
                    )
                    }
                </div>
            : null
            }

        </div>
    );

}