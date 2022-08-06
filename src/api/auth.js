import { result } from 'lodash';
import jwtDecode from 'jwt-decode';
import { TOKEN } from '../utils/constants';

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

export async function signInApi(user) {
    const url = `${import.meta.env.VITE_APP_API_URL}/login`;

    const data = {
        ...user,
        email: user.email.toLowerCase(),
    };

    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } 
        return { error: true, message: 'Usuario y/o password incorrectos' }
    }).then(result => {
        return result;
    }).catch(err => {
        return { error: true, message: err.message }
    });


}

export function setTokenApi(token) {
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
    return localStorage.getItem(TOKEN);
}

export function logoutApi() {
    localStorage.removeItem(TOKEN);
}

export function isUserAutenticatedApi() {
    const token = getTokenApi();
    
    if(!token) {
        logoutApi();
        return false;
    }

    if(isTokenExpired(token)) {
        logoutApi();
        return false;
    }

    return jwtDecode(token);
}

function isTokenExpired(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now();

    if(timeout < 0) {
        return true;
    } 
    return false;
}