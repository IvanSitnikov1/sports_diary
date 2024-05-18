import {Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {TrainingDay} from '../components/TrainingDay';
import {instance} from '../api/axios.api';


export const UpdateProgram = ({trainingDays, name, description, setTrainingDays, setName, setDescription, isLoading}) => {
    const navigate = useNavigate ();

    const updateTrainingDays = (index, value) => {
        const updatedTrainingDays = {...trainingDays};
        updatedTrainingDays[index] = value;
        setTrainingDays(updatedTrainingDays);
//         console.log(trainingDays)
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
    useEffect(() => {
        console.log('UpdateProgram', trainingDays)
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <div>
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
            </div>
            )}
        </>
    )
}