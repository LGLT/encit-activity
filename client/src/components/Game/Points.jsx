import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

export default function Points () {

    let points = useSelector(store => store.savePointsReducer.points);

    useEffect(() => {

    }, [points])

    return (
        <div>{console.log(points)}
            <h2>Puntos del equipo: {localStorage.totalPoints ? localStorage.totalPoints : 0}</h2>
        </div>
    );

}