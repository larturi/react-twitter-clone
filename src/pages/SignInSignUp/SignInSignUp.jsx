import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment
} from "@fortawesome/free-solid-svg-icons";

import Logo from '../../assets/png/logo.png';
import LogoWhite from '../../assets/png/logo-white.png';
import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignInSignUp.scss';

export default function SignInSignUp() {

   const [showModal, setShowModal] = useState(false);
   const [contentModal, setContentModal] = useState(null);

   const openModal = content => {
      setShowModal(true);
      setContentModal(content);
   }

   return (
      <>
         <Container className='signin-signup' fluid>
           <Row>
               <LeftComponent />
               <RightComponent openModal={openModal} setShowModal={setShowModal} />
            </Row>
         </Container>

         <BasicModal 
            show={showModal}
            setShow={setShowModal}
         >
            {contentModal}
         </BasicModal>
      </>
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

function RightComponent({openModal, setShowModal}) {
   return (
      <Col className='signin-signup__right' xs={6}>
         <div>
            <img src={LogoWhite} alt="Logo" />
            <h2>Mira lo que esta pasando en el mundo ahora.</h2>
            <h3>Unete hoy mismo!</h3>

            <Button variant='primary' onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}>
               Registrate
            </Button>

            <Button variant='outline-primary' onClick={() => openModal(<h4>Formulario</h4>)}>
               Iniciar Sesión
            </Button>
         </div>
      </Col>
   );
}
