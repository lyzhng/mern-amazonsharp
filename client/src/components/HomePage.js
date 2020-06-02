import React from "react";
import { Container } from "react-bootstrap";

import Navbar from "./Navbar";

export default () => {
  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Home m-3">
        <h2>Welcome to Amazon#!</h2>
      </Container>
    </div>
  )
};

