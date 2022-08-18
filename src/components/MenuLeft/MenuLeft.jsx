import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutApi } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff,
  } from "@fortawesome/free-solid-svg-icons";
import LogoWhite from '../../assets/png/logo-white.png';
import TweetModal from '../Modal/TweetModal/TweetModal';

import './MenuLeft.scss';

export default function MenuLeft() {

  const {user} = useAuth();

  const [showModal, setShowModal] = useState(false);

  const logoutHandler = () => {
    logoutApi(); 
    window.location.reload();
  }

  return (
    
    <div className="left-menu">
        <img className="logo" src={LogoWhite} alt="Twitter Clone" />

        <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Inicio
        </Link>
        <Link to="/users">
            <FontAwesomeIcon icon={faUsers} /> Usuarios
        </Link>
        <Link to={`/${user?._id}`}>
            <FontAwesomeIcon icon={faUser} /> Perfil
        </Link>
        <Link to="/" onClick={logoutHandler}>
            <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
        </Link>

        <Button onClick={() => setShowModal(true)}>Twittear</Button>

        <TweetModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}
