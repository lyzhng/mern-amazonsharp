import React, { useRef, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

import Navbar from './Navbar';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(e) {
    e.preventDefault();
    try {
      const res = await Axios.post('/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      setMessage(res.data.message);
      if (res.data.success) {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const loginForm = (
    <Form onSubmit={e => login(e)} method="POST" noValidate>
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
        {message}
        {loginForm}
      </Container>
    </div>
  );
};
