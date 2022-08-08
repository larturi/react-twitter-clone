import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuLeft from '../../components/MenuLeft/MenuLeft';

import './BasicLayout.scss';

export default function BasicLayout({ children, className }) {

  return (
    <Container className={`basic-layout ${className}`}>
        <Row>
          <Col xs={3} className='basic-layout__menu'>
            <MenuLeft />
          </Col>

          <Col xs={9} className='basic-layout__content'>
            {children}
          </Col>
        </Row>
    </Container>
  )
}
