import {Card, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

import {instance} from '../api/axios.api';

export const TrainingDay = ({numDay, trainingDays, setTrainingDays}) => {
    const [exercises, setExercises] = useState([])

    const updateExerciseId = (index, id) => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays[numDay - 1]['training_exercises'][index]['exercise'] = id;
        setTrainingDays(updatedTrainingDays);
    };

    const updateExerciseValue = (index, value) => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays[numDay - 1]['training_exercises'][index]['value'] = value;
        setTrainingDays(updatedTrainingDays);
    };

    const addExercise = () => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays[numDay - 1]['training_exercises'].push({'exercise': null, 'value': ''});
        setTrainingDays(updatedTrainingDays);
    }
    const deleteExercise = () => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays[numDay - 1]['training_exercises'].pop();
        setTrainingDays(updatedTrainingDays);
    }

    const getExercises = () => {
        instance.get('exercise/').then((resp) => {
            setExercises(resp.data);
        })
        .catch((err) => {
            console.log(err.response?.data)
        });
    };

    useEffect(() => {
        getExercises();
    }, [])

    return (
        <>
            <Card style={{maxWidth: "400px", backgroundColor: "#afd3a9a6"}}>
                <Card.Body>
                    <Card.Title className="text-center">Day {numDay}</Card.Title>
                    <Card.Text>
                        <Form>
                            <div className="d-flex">

                                <Form.Group className="m-1 text-center col-6">
                                    <Form.Label>Упражнение</Form.Label>
                                    {trainingDays[numDay - 1]["training_exercises"].map((exercise, index) => (
                                        <div key={index}>
                                            <Form.Select className="m-1" onChange={(e) => updateExerciseId(index, e.target.value)}>
                                                <option>Select exercise</option>
                                                {exercises.map((exercise) => (
                                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    ))}
                                </Form.Group>

                                <Form.Group className="m-1  text-center">
                                    <Form.Label>Вес/подх.*повт.</Form.Label>
                                    {trainingDays[numDay - 1]["training_exercises"].map((exercise, index) => (
                                        <div key={index}>
                                            <Form.Control
                                                type="text"
                                                className="m-1"
                                                value={trainingDays[numDay - 1]['training_exercises'][index]['value']}
                                                onChange={(e) => updateExerciseValue(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </Form.Group>

                            </div>
                        </Form>
                        <Button variant="primary" className="me-2" onClick={addExercise}>+</Button>
                        <Button variant="danger" onClick={deleteExercise}>-</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}