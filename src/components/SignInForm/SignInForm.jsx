import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../helpers/validations';
import { signInApi, setTokenApi } from '../../api/auth';

import './SignInForm.scss';

export default function SignInForm({setRefreshCheckLogin}) {
   const [formData, setFormData] = useState(initialFormValue());
   const [signInLoading, setSignInLoading] = useState(false);

   const login = async () => {
      const result = await signInApi(formData);

      if(result.message) {
         toast.error(result.message);
      } else  {
         setTokenApi(result.token);
         setRefreshCheckLogin(true);
      }
      
      setSignInLoading(false);
   }

   useEffect(() => {
      if(signInLoading) {
         login();
      }
   }, [signInLoading])
   

   const onSubmit = (e) => {
      e.preventDefault();

      let validCount = 0;

      values(formData).some((value) => {
         if (value !== '') {
            validCount++;
            return null;
         }
      });

      if (validCount !== size(formData)) {
         toast.warning('Debes ingresar tu email y tu contraseña');
      } else {
        if(!isEmailValid(formData.email)) {
            toast.warning('Email inválido');
        } else if (formData.password.length < 6) {
            toast.warning('La contraseña debe tener al menos 6 caracteres');
        } else {
            setSignInLoading(true);
        }
      }
   };

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div className='sign-in-form'>
         <h2>Ingresar</h2>
         <Form onSubmit={onSubmit}>
            <Form.Group>
               <Form.Control
                  type='email'
                  placeholder='Correo electrónico'
                  name='email'
                  defaultValue={formData.email}
                  onChange={onChange}
                  noValidate
               />
               <Form.Control
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  defaultValue={formData.password}
                  onChange={onChange}
               />

               <Button variant='primary' type='submit'>
                  { !signInLoading ? 'Iniciar Sesión' : <Spinner animation="border" />}
               </Button>
            </Form.Group>
         </Form>
      </div>
   );
}

function initialFormValue() {
   return {
      email: '',
      password: '',
   };
}
