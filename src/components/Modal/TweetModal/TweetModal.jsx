import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { createTweetApi } from '../../../api/tweet';

import { Close } from "../../../helpers/icons";

import './TweetModal.scss';

const TweetModal = ({ showModal, setShowModal }) => {

    const maxLength = 280;

    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (message.length > 0 && message.length <= maxLength) {
         createTweetApi(message)
            .then((response) => {
              if (response?.code >= 200 && response?.code < 300) {
                toast.success(response.message);
                setShow(false);
                window.location.reload();
              }
            })
            .catch(() => {
              toast.warning("Erorr al enviar el tweet, inténtelo más tarde.");
            });
        }
      };

   return (
      <Modal
         className='tweet-modal'
         show={showModal}
         onHide={() => setShowModal(false)}
         centered
         size='lg'
      >
         <Modal.Header>
            <Modal.Title>
               <Close onClick={() => setShowModal(false)} />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={onSubmit}>
               <Form.Control
                  as='textarea'
                  rows='6'
                  placeholder='¿Qué está pensando?'
                  onChange={(e) => setMessage(e.target.value)}
               />
               <span
                  className={classNames('count', {
                     error: message.length > maxLength,
                  })}
               >
                  {message.length}
               </span>
               <Button
                  type='submit'
                  disabled={message.length > maxLength || message.length < 1}
               >
                  Twittear
               </Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default TweetModal;
