import {Form, Button} from 'react-bootstrap';

import {TrainingDay} from '../components/TrainingDay';

export const CreateProgramPage = () => {
    return (
        <>
            <TrainingDay />
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