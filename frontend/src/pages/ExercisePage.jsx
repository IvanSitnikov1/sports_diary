import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';

import {Exercise} from '../components/Exercise';
import {instance} from '../api/axios.api';

export const ExercisePage = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        instance.get('exercise/').then((resp) => {
            setExercises(resp.data);
        })
        .catch((err) => {
            console.log(err.response?.data)
        });
    }, [])


    return (
        <>
            <div className="d-flex align-items-center text-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Упражнения</h3>
                <Button variant="warning">Добавить</Button>
            </div>
            {exercises.map((exercise) => (
                <Exercise exercise={exercise} />
            ))}
        </>
    )
}