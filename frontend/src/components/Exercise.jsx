import {Button, Card} from 'react-bootstrap';
import React, { useState } from 'react';

import {instance} from '../api/axios.api';
import {UpdateExercise} from './UpdateExercise';

export const Exercise = ({exercise, changeExercise}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id, name, photo, photo_url, description} = exercise;
    const imageUrl = photo_url ? photo_url : photo;

    const handleDelete = () => {
        instance.delete(`exercise/${id}/`).then((resp) => {
            changeExercise();
        });
    };

    return (
        <Card className="m-3" style={{minWidth: "500px", backgroundColor: "#afd3a9a6"}}>
            <div className="d-flex align-items-center justify-content-between me-3">
                <h4 className="m-3">{name}</h4>
                <div className="d-flex align-items-center">
                    <Button variant="outline-success" className="m-2" onClick={handleShow}>
                        Изменить
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </div>
            <div className="d-flex">
                <img
                    src={imageUrl}
                    alt="Logo"
                    className="m-2 col-2"
                />
                <p className="m-2 overflow-hidden">{description}</p>
            </div>
            <UpdateExercise
                show={show}
                handleClose={handleClose}
                changeExercise={changeExercise}
                exercise={exercise}
            />
        </Card>
    );
};
