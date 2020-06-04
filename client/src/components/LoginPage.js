import React, { useRef, useState } from 'react';
import { FormGroup, Button, InputGroup } from '@blueprintjs/core';

import Navbar from './Navbar';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(e) {
    console.log('Logging in...');
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
    <form onSubmit={e => login(e)} method="POST" novalidate style={{ width: '100%', height: '100%' }}>
      <FormGroup
        label="Email"
        labelFor="email">
        <InputGroup id="email" name="email" inputRef={emailRef} />
      </FormGroup>
      <FormGroup
        label="Password"
        labelFor="password">
        <InputGroup id="password" name="password" type="password" inputRef={passwordRef} />
      </FormGroup>
        <Button intent="primary" type="submit" text="Login" onClick={() => console.log(emailRef.current, passwordRef.current)} />
    </form>
  );

  return (
    <div className="Wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <div className="Content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', }}>
        {message}
        {loginForm}
      </div>
    </div>
  );
};
