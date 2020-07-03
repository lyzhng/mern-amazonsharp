import React, { useRef, useState, useContext, useEffect } from 'react';
import { FormGroup, Button, InputGroup } from '@blueprintjs/core';

import Navbar from './Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = props => {
  const history = useHistory();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const { state: locationState } = props.location;
    if (locationState && locationState.type === 'private' && !locationState.seen) {
      setMessage('You need to be logged in to view that page.');
      props.location.state.seen = true;
    }
  }, []);

  async function login(e) {
    console.log('Logging in...');
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const { message, username, success } = res.data;
      setMessage(message);
      setUser(username);
      if (success) {
        history.push('/');
      } else {
        setMessage('The email or password you entered cannot be found in the system.');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const loginForm = (
    <form onSubmit={e => login(e)} method="POST" noValidate style={{ width: '100%', height: '100%' }}>
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
