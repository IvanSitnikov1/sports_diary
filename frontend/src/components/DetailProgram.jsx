import {Modal, Button, Col, Row, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {instance} from '../api/axios.api';


export const DetailProgram = ({show, handleClose, getPrograms, program}) => {
    const handleDeleteProgram = () => {
        instance.delete(`training-program/${program.id}/`).then((resp) => {
            getPrograms();
            handleClose();
        })
        .catch((err) => {
            console.log(err.response?.data)
        });
    };

    return (
        <>
            <Modal
                size="xl"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {program.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs="12" md="5">
                                <Row>
                                    <Col><h5>Упражнение</h5></Col>
                                    <Col><h5>Вес/подх.*повт.</h5></Col>
                                </Row>
                                {program.training_days && program.training_days.map((day, index) => (
                                    <div key={index}>
                                        <p className="text-center">День {index + 1}</p>
                                        {day.training_exercises.map((exercise) => (
                                            <Row>
                                                <Col><p>{exercise.exercise_name}</p></Col>
                                                <Col><p>{exercise.value}</p></Col>
                                            </Row>
                                        ))}
                                    </div>
                                ))}
                            </Col>
                            <Col xs="12" md="7">
                                <h5 className="text-center">Описание программы</h5>
                                <p className="mx-5">{program.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
              <Modal.Footer>
                <Link to={{pathname: '/programs/update', search: `?programId=${program.id}`}}><Button variant="success">Редактировать</Button></Link>
                <Button variant="danger" onClick={handleDeleteProgram}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
