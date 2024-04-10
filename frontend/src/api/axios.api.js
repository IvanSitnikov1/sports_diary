import axios from 'axios';

import {getTokenFromLocalStorage} from '../helpers/localstorage.helper';

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        Authorization: getTokenFromLocalStorage() ? `Bearer ${getTokenFromLocalStorage()}` : '',
    },
})
