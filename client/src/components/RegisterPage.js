import React, { useRef, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import Axios from 'axios';

export default () => {
  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [redirectLoc, setRedirectLoc] = useState();
  async function register(e) {
    e.preventDefault();
    const res = await Axios.post('/auth/register', {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    setRedirectLoc(res.data.redirectLoc);
  }

  const registerForm = (
    <Form onSubmit={e => register(e)} method="POST">
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control ref={emailRef} type="email" name="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control ref={usernameRef} type="text" name="username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" name="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );

  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Register my-3">
        {redirectLoc ? <Redirect to="/login" /> : registerForm}
      </Container>
    </div>
  );
};
