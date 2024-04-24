import {Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {TrainingDay} from '../components/TrainingDay';
import {instance} from '../api/axios.api';

export const UpdateProgramPage = () => {
    const navigate = useNavigate ();
    const [countDays, setCountDays] = useState(1);
    const [trainingDays, setTrainingDays] = useState({});
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const programId = searchParams.get('programId');
        if (programId) {
            instance.get(`training-program/${programId}/`).then((resp) => {
                setDescription(resp.data.description);
                setName(resp.data.name);
                const lst = {}
                resp.data.training_days.map((day, index) => {
                    lst[index + 1] = [];
                    day.training_exercises.map((exercise) => {
                        lst[index + 1].push({ exercise: exercise.exercise, value: exercise.value });
                    });
                });
                console.log(lst)
            })
            .catch((err) => {
                console.log(err.response?.data)
            });
        }
    }, []);

    const updateTrainingDays = (index, value) => {
        const updatedTrainingDays = {...trainingDays};
        updatedTrainingDays[index] = value;
        setTrainingDays(updatedTrainingDays);
        console.log(trainingDays)
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

    const addCount = () => {setCountDays(countDays + 1)}
    const cancelCount = () => {setCountDays(countDays - 1)}
    const selectArray = Array.from({ length: countDays }, (_, index) => index);

    return (
        <>
            <div className="d-flex align-items-center text-center justify-content-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Программа тренировок</h3>
            </div>
            <div className="d-flex">
                {selectArray.map((item, index) => (
                     <div key={index}>
                         <TrainingDay numDay={index + 1} updateTrainingDays={updateTrainingDays} trainingDays={trainingDays} />
                     </div>
                ))}
            </div>
            <Button variant="primary" className="me-2" onClick={addCount}>+</Button>
            <Button variant="danger" onClick={cancelCount}>-</Button>
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