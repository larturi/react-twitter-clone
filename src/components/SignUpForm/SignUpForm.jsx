import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../helpers/validations';
import { signUpApi } from '../../api/auth';

import './SignUpForm.scss';

export default function SignUpForm({ setShowModal }) {
   const [formData, setFormData] = useState(initialFormValue());
   const [signUpLoading, setSignUpLoading] = useState(false);

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
         toast.warning('Completa todos los campos del formulario');
      } else {
         if (!isEmailValid(formData.email)) {
            toast.warning('Email inválido');
         } else if (formData.password !== formData.passwordConfirm) {
            toast.warning('Las contraseñas no coinciden');
         } else if (formData.password.length < 6) {
            toast.warning('La contraseña debe tener al menos 6 caracteres');
         } else {
            setSignUpLoading(true);
            signUpApi(formData)
               .then((response) => {
                  if (response.code) {
                     toast.warning(response.message);
                  } else {
                     toast.success('Usuario registrado correctamente');
                     setShowModal(false);
                     setFormData(initialFormValue);
                  }
               })
               .catch(() => {
                  toast.error('Error al intentar registrar el usuario');
               })
               .finally(() => {
                  setSignUpLoading(false);
               });
         }
      }
   };

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div className='sign-up-form'>
         <h2>Crea tu cuenta</h2>
         <Form onSubmit={onSubmit}>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control
                        type='text'
                        placeholder='Nombre'
                        name='name'
                        value={formData.name}
                        onChange={onChange}
                     />
                  </Col>
                  <Col>
                     <Form.Control
                        type='text'
                        placeholder='Apellido'
                        name='lastName'
                        value={formData.lastName}
                        onChange={onChange}
                     />
                  </Col>
               </Row>
            </Form.Group>

            <Form.Group>
               <Form.Control
                  type='email'
                  placeholder='Correo electrónico'
                  name='email'
                  value={formData.email}
                  onChange={onChange}
                  noValidate
               />
            </Form.Group>

            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={formData.password}
                        onChange={onChange}
                     />
                  </Col>
                  <Col>
                     <Form.Control
                        type='password'
                        placeholder='Repetir Contraseña'
                        name='passwordConfirm'
                        value={formData.passwordConfirm}
                        onChange={onChange}
                     />
                  </Col>
               </Row>
            </Form.Group>

            <Button variant='primary' type='submit'>
               {!signUpLoading ? 'Registrarse' : <Spinner animation='border' />}
            </Button>
         </Form>
      </div>
   );
}

function initialFormValue() {
   return {
      name: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
   };
}
