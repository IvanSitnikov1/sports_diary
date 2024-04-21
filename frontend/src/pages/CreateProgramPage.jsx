import {Form, Button} from 'react-bootstrap';
import { useState } from 'react';

import {TrainingDay} from '../components/TrainingDay';

export const CreateProgramPage = () => {
    const [countDays, setCountDays] = useState(1);
    const [trainingDays, setTrainingDays] = useState({});

    const updateTrainingDays = (index, value) => {
        const updatedTrainingDays = {...trainingDays};
        updatedTrainingDays[index] = value;
        setTrainingDays(updatedTrainingDays);
    };

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
//                         value={exerciseData.description}
//                         onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="warning" className="mt-2">Сохранить</Button>
            </Form>
        </>
    )
}