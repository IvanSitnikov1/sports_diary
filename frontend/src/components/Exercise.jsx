import {Button} from 'react-bootstrap';

import {instance} from '../api/axios.api';

export const Exercise = ({exercise, changeExercise}) => {
    const {id, name, photo, photo_url, description} = exercise
    const imageUrl = photo_url ? photo_url : photo

    const handleDelete = () => {
        instance.delete(`exercise/${id}/`).then((resp) => {
            changeExercise();
        });
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="m-3">{name}</h4>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Удалить
                </Button>
            </div>
            <div
                className="d-flex mt-3"
                style={{minWidth: "500px", backgroundColor: "#afd3a9a6"}}
            >
                <img
                    src={imageUrl}
                    width="130"
                    alt="Logo"
                    className="m-2"
                />
                <p className="m-2 overflow-hidden">{description}</p>
            </div>
        </>
    )
}