import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {CreateProgramPage} from './CreateProgramPage';

export const ProgramPage = () => {
    return (
        <>
            <div className="d-flex align-items-center text-center justify-content-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Программы тренировок</h3>
                <Link to="create"><Button variant="warning">Добавить</Button></Link>
            </div>
            <Card
                className="mt-3"
                style={{minWidth: "500px", backgroundColor: "#afd3a9a6"}}
            >
                <Card.Body>
                    <Card.Title>Название программы</Card.Title>
                    <Card.Text>
                        Описание программы...Описание программы...Описание программы...
                        Описание программы...Описание программы...
                    </Card.Text>
                    <Card.Link href="#">Подробнее</Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}