import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';

import {Exercise} from '../components/Exercise';
import {CreateExercise} from '../components/CreateExercise';
import {instance} from '../api/axios.api';

export const ExercisePage = () => {
    const [exercises, setExercises] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const getExercises = () => {
        instance.get('exercise/').then((resp) => {
            setExercises(resp.data);
        })
        .catch((err) => {
            console.log(err.response?.data);
        });
    };

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <>
            <div className="d-flex align-items-center text-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Упражнения</h3>
                <Button variant="warning" onClick={handleShow}>Добавить</Button>
            </div>
            {exercises.slice().reverse().map((exercise) => (
                <Exercise exercise={exercise} changeExercise={getExercises} />
            ))}
            <CreateExercise show={show} handleClose={handleClose} changeExercise={getExercises} />
        </>
    );
};
