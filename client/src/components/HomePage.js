import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

import Navbar from "./Navbar";

export default () => {
  const [redirectLoc, setRedirectLoc] = React.useState();
  const homepage = (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Home m-3">
        <h2>Welcome to Amazon#!</h2>
      </Container>
    </div>
  );

  return (
    <div>
      {redirectLoc ? <Redirect to="/" /> : homepage}
    </div>
  )
};

