import { useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

import {instance} from '../api/axios.api';

export const UpdateExercise = ({show, handleClose, changeExercise, exercise}) => {
    const [exerciseData, setExerciseData] = useState({
        name: exercise.name,
        description: exercise.description,
        photo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const photo = name === 'photo' ? (files.length > 0 ? files[0] : null) : value;
        setExerciseData(prevState => ({
            ...prevState,
            [name]: photo
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', exerciseData.name);
        formData.append('description', exerciseData.description);

        if (exerciseData.photo) {
            formData.append('photo', exerciseData.photo);
        }

        instance.put(`exercise/${exercise.id}/`, formData).then((resp) => {
            console.log('Упражнение успешно изменено:', resp.data);
            changeExercise();
            handleClose();
        }).catch((err) => {
            console.log(err.response?.data);
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title >Упражнение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Введите название упражнения"
                            value={exerciseData.name}
                            onChange={handleChange}
                        />
                        <Form.Group className="mt-2">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Введите описание упражнения"
                                value={exerciseData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Фото</Form.Label>
                            <Form.Control
                                type="file"
                                name="photo"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="warning" onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
