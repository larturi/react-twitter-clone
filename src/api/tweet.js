import { getTokenApi } from './auth';

export function createTweetApi(message) {
   const url = `${import.meta.env.VITE_APP_API_URL}/tweet`;

   const data = {
      message,
   };

   const params = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
      body: JSON.stringify(data),
   };

   return fetch(url, params)
      .then((response) => {
         if (response.status >= 200 && response.status < 300) {
            return { code: response.status, message: 'Tweet enviado.' };
         } else {
            return { code: 500, message: 'Error del servidor.' };
         }
      })
      .catch((err) => {
         return err;
      });
}

export function getUserTweetsApi(idUser, page) {
   const url = `${
      import.meta.env.VITE_APP_API_URL
   }/tweets?id=${idUser}&page=${page}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then((response) => response.json())
      .then((result) => result)
      .catch((err) => err);
}

export function getTweetsFollowersApi(page = 1) {
  const url = `${
      import.meta.env.VITE_APP_API_URL
   }/tweetsFollowing?page=${page}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then((response) => response.json())
      .then((result) => result)
      .catch((err) => err);
}
