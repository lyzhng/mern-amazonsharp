import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Axios from 'axios';

export default () => {
  const { user, setUser } = useContext(UserContext);

  const loginButton = (
    <Nav.Item className="ml-2">
      <Button size="md" href="/login">
        Login
    </Button>
    </Nav.Item>
  )

  const profileButton = (
    <Nav.Item className="ml-2">
      <Button size="md" variant="dark" href={`/profile/${user}`}>
        {user}
      </Button>
    </Nav.Item>
  )

  const logoutButton = (
    <Nav.Item className="ml-2">
      <Button
        size="md"
        href="/logout"
        onClick={async (e) => {
          e.preventDefault();
          await Axios.post('/auth/logout');
          setUser(null);
        }}>
        Logout
    </Button>
    </Nav.Item>
  )

  const registerButton = (
    <Nav.Item className="ml-2">
      <Button size="md" href="/register">
        Register
    </Button>
    </Nav.Item>
  )

  useEffect(() => {
    Axios.get('/api/user_data')
      .then(res => {
        console.log(res.data)
        setUser(res.data.username);
      })
  }, [])

  return (
    <Navbar className="Navbar" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Amazon#</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/explore">Explore</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="ml-auto">
        {
          user
            ? profileButton
            : loginButton
        }
        {
          user
            ? logoutButton
            : registerButton
        }
      </Nav>
    </Navbar >
  );
};
