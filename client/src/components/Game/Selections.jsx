import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import socket from '../socket/socket';
import { saveAllSelections } from '../../redux/actions-types/saveAllSelectionsActions';

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
        }
        return () => {socket.off("selectionsFinished"); socket.off("showSelectedOption");}
    });

    
    useEffect(() => {
        if(parseInt(localStorage.questionIndex) === questionIndex) {
            socket.emit('checkAllSelections', allSelections.length, localStorage.teamName)
        }
    }, [allSelections]);

    return (
        <div>
            <div>{console.log(allSelections)}
                {
                    allSelections.length > 0 ?
                        <div>
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
        </div>
    );

}