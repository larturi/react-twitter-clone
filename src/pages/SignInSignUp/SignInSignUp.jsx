import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment
} from "@fortawesome/free-solid-svg-icons";

import Logo from '../../assets/png/logo.png';
import LogoWhite from '../../assets/png/logo-white.png';

import './SignInSignUp.scss';

export default function SignInSignUp() {
   return (
      <Container className='signin-signup' fluid>
         <Row>
            <LeftComponent />
            <RightComponent />
         </Row>
      </Container>
   );
}

function LeftComponent() {
   return (
      <Col className='signin-signup__left' xs={6}>
         <img src={Logo} alt='Logo' />
         <div>
            <h2>
               <FontAwesomeIcon icon={faSearch} />
               Sigue lo que te interesa.
            </h2>
            <h2>
               <FontAwesomeIcon icon={faUsers} />
               Entérate de qué está hablando la gente.
            </h2>
            <h2>
               <FontAwesomeIcon icon={faComment} />
               Únete a la conversación.
            </h2>
         </div>
      </Col>
   );
}

function RightComponent() {
   return (
      <Col className='signin-signup__right' xs={6}>
         <div>
            <img src={LogoWhite} alt="Logo" />
            <h2>Mira lo que esta pasando en el mundo ahora.</h2>
            <h3>Unete hoy mismo!</h3>

            <Button variant='primary'>
               Registrate
            </Button>
            <Button variant='outline-primary'>
               Iniciar Sesión
            </Button>
         </div>
      </Col>
   );
}
