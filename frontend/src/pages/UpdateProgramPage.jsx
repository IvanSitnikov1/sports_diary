import {Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {TrainingDay} from '../components/TrainingDay';
import {instance} from '../api/axios.api';
import {UpdateProgram} from '../components/UpdateProgram';

export const UpdateProgramPage = () => {
    const navigate = useNavigate ();
    const [trainingDays, setTrainingDays] = useState({});
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const programId = searchParams.get('programId');
        if (programId) {
            setIsLoading(true);
            instance.get(`training-program/${programId}/`).then((resp) => {
                setDescription(resp.data.description);
                setName(resp.data.name);
                const outputObject = resp.data.training_days.reduce((acc, curr, index) => {
                    const key = index + 1;
                    const exerciseArray = curr.training_exercises.map(exercise => ({
                        exercise: exercise.exercise,
                        value: exercise.value
                    }));
                    acc[key] = exerciseArray;
                    return acc;
                }, {});
                setTrainingDays(outputObject);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response?.data);
                setIsLoading(false);
            });
        }
    }, []);

    if (isLoading || Object.keys(trainingDays).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <UpdateProgram
            trainingDays={trainingDays}
            name={name}
            description={description}
            setTrainingDays={setTrainingDays}
            setName={setName}
            setDescription={setDescription}
            isLoading={isLoading}
        />
    )
}