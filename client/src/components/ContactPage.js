import React, { useRef, useState } from 'react';
import { FormGroup, InputGroup, Button, TextArea, Intent } from '@blueprintjs/core';

import Navbar from './Navbar';

const ContactPage = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const textRef = useRef();
  const [message, setMessage] = useState();

  const contact = async (e) => {
    e.preventDefault();
  }

  const contactForm = (
    <form onSubmit={e => contact(e)} method="POST" noValidate style={{ width: '100%', height: '100%' }}>
      <FormGroup
        label="Email"
        labelFor="email">
        <InputGroup id="email" name="email" placeholder="johnappleseed@example.com" type="email" inputRef={emailRef}/>
      </FormGroup>
      <FormGroup
        label="Full Name"
        labelFor="name">
        <InputGroup id="name" name="name" type="text" inputRef={nameRef}/>
      </FormGroup>
      <TextArea intent={Intent.PRIMARY} large fill />
      <Button intent="primary" type="submit" text="Contact" />
    </form>
  );

  return (
    <div className="Wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <div className="Content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
        {message}
        {contactForm}
      </div>
    </div>
  )
}

export default ContactPage;
