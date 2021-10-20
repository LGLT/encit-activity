import React, {useEffect, useState} from 'react';

import socket from '../socket/socket';

export default function Selections () {
    const [usersSelections, setUsersSelections] = useState([])
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        socket.on('showSelectedOption', (selections) => {
            setUsersSelections(selections)
        })

        socket.on('selectionsFinished', () => {
            setShowResults(true)
        })
    

    })

    useEffect(() => {
        socket.emit('checkAllSelections', usersSelections.length, localStorage.teamName)
    }, [usersSelections])

    return (
        <div>
            {console.log(usersSelections)}
            {
                usersSelections.length > 0 ?
                    <div>
                        {
                        usersSelections.map(s => 
                            <div key={usersSelections.indexOf(s)}>
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