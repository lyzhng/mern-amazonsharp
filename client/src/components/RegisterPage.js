import React, { useRef, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import Axios from 'axios';

export default () => {
  const history = useHistory();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState();

  async function register(e) {
    e.preventDefault();
    console.log('Registering... (client)')
    try {
      const res = await Axios.post('/auth/register', {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setMessage(res.data.message);
      if (res.data.success) {
        history.push('/login');
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const registerForm = (
    <Form onSubmit={e => register(e)} method="POST" noValidate>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control ref={emailRef} type="email" name="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control ref={usernameRef} type="text" name="username" />
        <small className="text-muted">Your username should be between 6 and 16 (inclusive) alphanumeric characters.</small>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" name="password" />
        <small className="text-muted">Your password should be at least 8 characters. Go wild, but remember it!</small>
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
        {message}
        {registerForm}
      </Container>
    </div>
  );
};
