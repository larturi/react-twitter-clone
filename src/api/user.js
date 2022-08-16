import { getTokenApi } from './auth';

export function getUserApi(idUser) {
   const url = `${import.meta.env.VITE_APP_API_URL}/profile?id=${idUser}`;

   const params = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getTokenApi()}`,
      },
   };

   return fetch(url, params)
      .then((response) => {
         if (response.status >= 400) {
            return {
               error: true,
               message: 'Error al cargar los datos del usuario',
            };
         } else {
            return response.json();
         }
      })
      .then(result =>  result)
      .catch(err => err);
}

export function uploadBannerApi(file) {
   const url = `${import.meta.env.VITE_APP_API_URL}/uploadBanner`;

   const formData = new FormData();
   formData.append('banner', file);

   const params = {
      method: 'POST',
      headers: { Authorization: `Bearer ${getTokenApi()}`},
      body: formData,
   };

   return fetch(url, params)
      .then(response => response.json())
      .then(result => result)
      .catch(err => err);
}

export function uploadAvatarApi(file) {
   const url = `${import.meta.env.VITE_APP_API_URL}/uploadAvatar`;

   const formData = new FormData();
   formData.append('avatar', file);

   const params = {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${getTokenApi()}`,
      },
      body: formData,
   };

   return fetch(url, params)
      .then(response=> response.json())
      .then(result => result)
      .catch(err => err);
}

export function updateInfoUserApi(data) {
   const url = `${import.meta.env.VITE_APP_API_URL}/profile`;

   const params = {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getTokenApi()}`},
      body: JSON.stringify(data)
   };

   return fetch(url, params)
      .then(response =>  response.json())
      .then(result => result)
      .catch(err => err);
}
