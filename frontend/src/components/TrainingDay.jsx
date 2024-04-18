import {Card, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

import {instance} from '../api/axios.api';

export const TrainingDay = () => {
    const [exercises, setExercises] = useState([])
    const [countExercises, setCountExercises] = useState(1)

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
    }, [])

    return (
        <>
            <Card style={{maxWidth: "400px", backgroundColor: "#afd3a9a6"}}>
                <Card.Body>
                    <Card.Title className="text-center">Day 1</Card.Title>
                    <Card.Text>
                        <Form>
                             <div className="d-flex">
                                 <Form.Group className="m-1 text-center col-6">
                                     <Form.Label>Упражнение</Form.Label>
                                     {selectArray.map((item, index) => (
                                         <div key={index}>
                                             <Form.Select className="m-1">
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
                                             <Form.Control type="text" className="m-1"/>
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