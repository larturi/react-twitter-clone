import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './BasicLayout.scss';

export default function BasicLayout({ children, className }) {

  console.log(className);
  return (
    <Container className={`basic-layout ${className}`}>
        <Row>
          <Col xs={3} className='BasicLayout__menu'>
            <h2>Menu</h2>
          </Col>

          <Col xs={9} className='BasicLayout__content'>
            {children}
          </Col>
        </Row>
    </Container>
  )
}
