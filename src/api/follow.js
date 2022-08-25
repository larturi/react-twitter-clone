import { getTokenApi } from './auth';

export function checkFollowApi(idUser) {
   const url = `${import.meta.env.VITE_APP_API_URL}/relationCkeck?id=${idUser}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then(response => response.json())
      .then(result => result)
      .catch(err => err);
}

export function followUserApi(idUser) {
   const url = `${import.meta.env.VITE_APP_API_URL}/relationAdd?id=${idUser}`;

   const params = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then(response => response.json())
      .then(result => result)
      .catch(err => err);
}

export function unfollowUserApi(idUser) {
   const url = `${import.meta.env.VITE_APP_API_URL}/relationRemove?id=${idUser}`;

   const params = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then(response => response.json())
      .then(result => result)
      .catch(err => err);
}

export function getFollowsApi(paramsUrl) {

   const {page = 1, type = 'follow', search = ''} = paramsUrl;
   const queryString = `page=${page}&type=${type}&search=${search}`;

   const url = `${import.meta.env.VITE_APP_API_URL}/userSearch?${queryString}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then(response => response.json())
      .then(result => result)
      .catch(err => err);
}