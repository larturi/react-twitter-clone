import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

import './SignUpForm.scss';

export default function SignUpForm({ setShowModal }) {

  const [formData, setFormData] = useState(initialFormValue());

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    console.log(formData);
  }

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
    
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
                Registrarse
            </Button>
        </Form>
    </div>
  )
}

function initialFormValue() {
    return {
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
}