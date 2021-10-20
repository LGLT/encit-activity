import React, {useEffect, useState} from 'react';

import socket from '../socket/socket';

export default function Selections () {
    const [usersSelections, setUsersSelections] = useState([])

    useEffect(() => {
        socket.on('showSelectedOption', (selections) => {
            setUsersSelections(selections)
        })
    })

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