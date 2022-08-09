import { getTokenApi } from './auth';

export function getUserApi(idUser) {

    const url = `${import.meta.env.VITE_APP_API_URL}/profile?id=${idUser}`;

    const params = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        if (response.status >= 400) {
            return { error: true, message: 'Error al cargar los datos del usuario' }
        } else {
            return response.json();
        }
    }).then(result => {
        return result;
    }).catch(err => {
        return { error: true, message: err.message }
    });

}