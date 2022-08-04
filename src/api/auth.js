import { result } from "lodash";

export async function signUpApi(user) {

    const url = `${import.meta.env.VITE_APP_API_URL}/register`;
    const { passwordConfirm, ...userTemp } = user;

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userTemp.email.toLowerCase(),
            password: userTemp.email,
            name: userTemp.name,
            last_name: userTemp.lastName,
            birth_date: new Date(),
        })
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log('OK');
            return response.json();
        } else {
            return { error: true, message: 'Email no disponible' }
        }
    }).then(result => {
        return result;
    }).catch(err => {
        return { error: true, message: err.message }
    });

}