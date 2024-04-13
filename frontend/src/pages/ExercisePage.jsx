import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

import {Exercise} from '../components/Exercise';

export const ExercisePage = () => {

    return (
        <>
            <div className="d-flex align-items-center text-center" style={{minWidth: "600px"}}>
                <h3 className="col-4">Упражнения</h3>
                <Button variant="warning">Добавить</Button>
            </div>
            <Exercise/>
        </>
    )
}