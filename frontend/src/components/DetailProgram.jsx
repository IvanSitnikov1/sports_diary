import {Modal, Form, Button, Col, Row, Container} from 'react-bootstrap';

export const DetailProgram = ({show, handleClose, getPrograms, program}) => {


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
                <Button variant="danger" onClick={handleClose}>Удалить</Button>
              </Modal.Footer>
            </Modal>
        </>
    )
}