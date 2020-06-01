import React, { useRef, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default () => {
  const [redirectLoc, setRedirectLoc] = useState();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  async function login(e) {
    e.preventDefault();
    console.log('Logging in....')
    Axios
      .post('/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.redirectLoc)
          setRedirectLoc(res.data.redirectLoc)
        }
      })
      .catch(err => {
        console.error(err);

      })
  }

  const loginForm = (
    <Form onSubmit={e => login(e)} method="POST">
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control ref={emailRef} type="email" name="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" name="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );

  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Login my-3">
        {redirectLoc ? <Redirect to={redirectLoc} /> : loginForm}
      </Container>
    </div>
  );
};
