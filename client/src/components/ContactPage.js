import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';

import Navbar from './Navbar';

const ContactForm = (
  <Form onSubmit={e => e.preventDefault()}>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control name="name" type="text" size="sm" />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" type="email" size="sm"/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" size="sm"/>
    </Form.Group>
    <Button variant="primary" size="sm">Send Message</Button>
  </Form>
);

export default () => {
  return (
    <div className="Wrapper">
      <Navbar />
      <Container className="About my-3">
        <h2>Contact Us</h2>
        {ContactForm}
      </Container>
    </div>
  )
}