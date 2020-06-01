import React from 'react';
import { Container } from 'react-bootstrap';

import Navbar from './Navbar';

export default () => {
  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Home my-3">
        <h2>About</h2>
        <p>
          Amazon# was first created with Flask and SQLite3, about a year ago.
          Because I am learning React, I am recreating it using the MERN stack.
        </p>
      </Container>
    </div>
  );
}
