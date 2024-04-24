import {Modal, Button, Col, Row, Container} from 'react-bootstrap';

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
    }

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
                    <Col xs="12" md="6">
                      Exersises
                    </Col>
                    <Col xs="12" md="6">
                      {program.description}
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleClose}>Редактировать</Button>
                <Button variant="danger" onClick={handleDeleteProgram}>Удалить</Button>
              </Modal.Footer>
            </Modal>
        </>
    )
}