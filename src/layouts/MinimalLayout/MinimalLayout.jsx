import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './MinimalLayout.scss';

export default function MinimalLayout({ children }) {

  return (
    <Container className={`minimal-layout`}>
        <Row>
          <Col xs={12} className='minimal-layout__content'>
            {children}
          </Col>
        </Row>
    </Container>
  )
}
