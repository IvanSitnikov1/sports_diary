import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {instance} from '../api/axios.api';
import {DetailProgram} from '../components/DetailProgram';

export const ProgramPage = () => {
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (obj) => {
        setShow(true);
        setProgram(obj);
    };

    const getPrograms = () => {
        instance.get('training-program/').then((resp) => {
            setPrograms(resp.data);
        })
        .catch((err) => {
            console.log(err.response?.data)
        });
    };

    useEffect(() => {
        getPrograms();
    }, []);

    return (
        <>
            <div className="d-flex align-items-center text-center justify-content-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Программы тренировок</h3>
                <Link to="create"><Button variant="warning">Добавить</Button></Link>
            </div>
            {programs.map((obj) => (
                <Card
                    className="mt-3"
                    style={{minWidth: "500px", backgroundColor: "#afd3a9a6"}}
                >
                    <Card.Body>
                        <Card.Title>{obj.name}</Card.Title>
                        <Card.Text>{obj.description}</Card.Text>
                        <Button variant="link" onClick={() => handleShow(obj)}>Подробнее</Button>
                    </Card.Body>
                </Card>
            ))}
            <DetailProgram show={show} handleClose={handleClose} getPrograms={getPrograms} program={program} />
        </>
    );
};
