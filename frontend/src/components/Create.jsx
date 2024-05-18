import {Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {TrainingDay} from '../components/TrainingDay';
import {instance} from '../api/axios.api';

export const CreateProgramPage = () => {
    const navigate = useNavigate ();
    const [countDays, setCountDays] = useState(1);
    const [trainingDays, setTrainingDays] = useState({1: []});
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    const updateTrainingDays = (index, value) => {
        const updatedTrainingDays = {...trainingDays};
        updatedTrainingDays[index] = value;
        setTrainingDays(updatedTrainingDays);
    };

    const handleSaveProgram = () => {
        const listDays = []
        for (const day of Object.keys(trainingDays)) {
            const obj = {};
            obj['training_exercises'] = trainingDays[day];
            listDays.push(obj);
        }
        const data = JSON.stringify({'description': description, 'name': name, 'training_days': listDays})
        instance.post('training-program/', data).then((resp) => {
            console.log('Программа успешно добавлена');
            navigate('/programs');
        })
        .catch((err) => {
            console.log(err.response?.data)
        });
    }

    const addDay = () => {
        const keys = Object.keys(trainingDays);
        const maxKey = Math.max(...keys.map(Number), 0);
        const newKey = maxKey + 1;
        updateTrainingDays(newKey, []);
    }
    const deleteDay = () => {
        const keys = Object.keys(trainingDays);
        const maxKey = Math.max(...keys.map(Number), 0);
        const updatedTrainingDays = {...trainingDays};
        delete updatedTrainingDays[maxKey]
        setTrainingDays(updatedTrainingDays);
    }

    return (
        <>
            <div className="d-flex align-items-center text-center justify-content-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Программа тренировок</h3>
            </div>
            <div className="d-flex">
                {Object.entries(trainingDays).map(([key, value]) => (
                     <div key={key}>
                         <TrainingDay numDay={key} updateTrainingDays={updateTrainingDays} trainingDays={trainingDays} />
                     </div>
                ))}
            </div>
            <Button variant="primary" className="me-2" onClick={addDay}>+</Button>
            <Button variant="danger" onClick={deleteDay}>-</Button>
            <Form>
                <Form.Group className="mt-2">
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        placeholder="Введите описание тренировочной программы"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Введите название тренировочной программы"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </Form.Group>
                <Button variant="warning" className="mt-2" onClick={handleSaveProgram}>Сохранить</Button>
            </Form>
        </>
    )
}

import {Card, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

import {instance} from '../api/axios.api';

export const TrainingDay = ({numDay, updateTrainingDays, trainingDays}) => {
    const [exercises, setExercises] = useState([])
    const [countExercises, setCountExercises] = useState(1)
    const [exerciseValues, setExerciseValues] = useState({});
    const [exerciseIds, setExerciseIds] = useState({});

    const updateExerciseIds = (index, exerciseId) => {
        const newExerciseIds = {...exerciseIds};
        newExerciseIds[index] = exerciseId;
        setExerciseIds(newExerciseIds);
    };

    const updateExerciseValues = (index, value) => {
        const newExerciseValues = {...exerciseValues};
        newExerciseValues[index] = value;
        setExerciseValues(newExerciseValues);
    };

    const addCount = () => {setCountExercises(countExercises + 1)}
    const cancelCount = () => {setCountExercises(countExercises - 1)}
    const selectArray = Array.from({ length: countExercises }, (_, index) => index);

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
        for (let i = 0; i < Object.keys(trainingDays).length; i++) {
            trainingDays[numDay].map((ex, index) => {
                updateExerciseIds(index, ex.exercise)
                updateExerciseValues(index, ex.value)
            })
        }
        const mergedArray = Object.keys(exerciseIds).map(key => ({
            exercise: parseInt(exerciseIds[key]),
            value: exerciseValues[key]
        }));
        updateTrainingDays(numDay, mergedArray);
        console.log(trainingDays)
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
                                    {selectArray.map((item, index) => (
                                        <div key={index}>
                                            <Form.Select className="m-1" onChange={(e) => updateExerciseIds(index, e.target.value)}>
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
                                    {selectArray.map((item, index) => (
                                        <div key={index}>
                                            <Form.Control
                                                type="text"
                                                className="m-1"
                                                value={exerciseValues[index] ? exerciseValues[index] : ''}
                                                onChange={(e) => updateExerciseValues(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </Form.Group>
                            </div>
                        </Form>
                        <Button variant="primary" className="me-2" onClick={addCount}>+</Button>
                        <Button variant="danger" onClick={cancelCount}>-</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}