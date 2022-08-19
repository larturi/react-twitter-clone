import { getTokenApi } from './auth';

export function createTweetApi(message) {
    const url = `${import.meta.env.VITE_APP_API_URL}/tweet`;

    const data = {
        message
    }
 
    const params = {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getTokenApi()}`,
       },
       body: JSON.stringify(data),
    };
 
    return fetch(url, params)
       .then(response => response.json())
       .then(result => result)
       .catch(err => err);
 }
 