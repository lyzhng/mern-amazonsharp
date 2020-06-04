import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

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
    <form onSubmit={e => register(e)} method="POST" novalidate style={{ width: '100%', height: '100%' }}>
      <FormGroup
        label="Email"
        labelFor="email">
        <InputGroup id="email" name="email" placeholder="johnappleseed@example.com" type="email" inputRef={emailRef}/>
      </FormGroup>
      <FormGroup
        helperText="Your username should be between 6 and 16 (inclusive) alphanumeric characters."
        label="Username"
        labelFor="username">
        <InputGroup id="username" name="username" placeholder="johnappleseed" type="text" inputRef={usernameRef}/>
      </FormGroup>
      <FormGroup
        helperText="Your password should be at least 8 characters. Go wild, but remember it!"
        label="Password"
        labelFor="password">
        <InputGroup id="password" name="password" type="password" inputRef={passwordRef} />
      </FormGroup>
      <Button intent="primary" type="submit" text="Register" />
    </form>
  );

  return (
    <div className="Wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <div className="Content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
        {message}
        {registerForm}
      </div>
    </div>
  );
};
