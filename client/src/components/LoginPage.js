import React, { useRef, useState, useContext, useEffect } from 'react';
import { FormGroup, Button, InputGroup } from '@blueprintjs/core';

import Navbar from './Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const { message, username } = res.data;
      setMessage(message);
      setUser(username);
      if (res.data.success) {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const loginForm = (
    <form onSubmit={login} method="POST" noValidate style={{ width: '100%', height: '100%' }}>
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
        <Button intent="primary" type="submit" text="Login"  />
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

export default LoginPage;
