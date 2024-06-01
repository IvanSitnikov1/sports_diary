import {Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {TrainingDay} from '../components/TrainingDay';
import {instance} from '../api/axios.api';

export const UpdateProgramPage = () => {
    const [trainingDays, setTrainingDays] = useState({});
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate ();

    const searchParams = new URLSearchParams(location.search);
    const programId = searchParams.get('programId');

    const handleSaveProgram = () => {
        const data = JSON.stringify({'description': description, 'name': name, 'training_days': trainingDays});
        instance.put(`training-program/${programId}/`, data).then((resp) => {
            console.log('Программа успешно изменена');
            navigate('/programs');
        })
        .catch((err) => {
            console.log(err.response?.data);
        });
    };

    const addDay = () => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays.push({"training_exercises": [{'exercise': null, 'value': ''}]});
        setTrainingDays(updatedTrainingDays);
    };

    const deleteDay = () => {
        const updatedTrainingDays = [...trainingDays];
        updatedTrainingDays.pop();
        setTrainingDays(updatedTrainingDays);
    };

    useEffect(() => {
        if (programId) {
            setIsLoading(true);
            instance.get(`training-program/${programId}/`).then((resp) => {
                setDescription(resp.data.description);
                setName(resp.data.name);
                setTrainingDays(resp.data.training_days);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response?.data);
                setIsLoading(false);
            });
        }
    }, [programId]);

    if (isLoading || Object.keys(trainingDays).length === 0) {
        return <div>Loading...</div>
    }

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
                {trainingDays.map((day, index) => (
                     <div key={index}>
                         <TrainingDay numDay={index + 1} trainingDays={trainingDays} setTrainingDays={setTrainingDays} />
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
    );
};
