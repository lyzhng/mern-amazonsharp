import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover, Menu, MenuItem, Position, Button, Navbar, AnchorButton, Alignment } from '@blueprintjs/core';
import { UserContext } from '../context/UserContext';

const CustomNavbar = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const loginButton = (
    <AnchorButton icon="log-in" text="Login" href="/login" style={{
      margin: '0px 4px' 
    }} />
  )

  const menu = (
    <Popover 
      position={Position.BOTTOM}
      content={
        <Menu>
          <MenuItem href="/product/new" icon="add" text="Post New Item" />
          <MenuItem href="/settings" icon="cog" text="Settings" />
          <MenuItem icon="log-out" text="Logout"
            onClick={
              async (e) => {
                e.preventDefault();
                await axios.post('/api//auth/logout');
                setUser(null);
                history.push('/');
              }
            }
          />
        </Menu>
      }>
      <Button icon="menu" text="Menu" minimal={true} />
    </Popover>
  )

  const registerButton = (
    <AnchorButton text="Register" href="/register" style={{
      margin: '0px 4px'
    }} />
  )

  const profileIcon = (
    <AnchorButton text="Profile" icon="user" href={`/profile/${user}`} minimal={true} style={{
      margin: '0px 4px'
    }} />
  )

  const navbar = (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Amazon#</Navbar.Heading>
        <Navbar.Divider />
        <AnchorButton minimal={true} icon="home" text="Home" href="/" />
        <AnchorButton minimal={true} icon="grid-view" text="Explore" href="/explore" />
        <AnchorButton minimal={true} icon="office" text="Contact Us" href="/contact" />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {
          user
            ? <div>{profileIcon}{menu}</div>
            : <div>{loginButton}{registerButton}</div>
        }
      </Navbar.Group>
    </Navbar >
  )

  return (
    <div>
      {navbar}
    </div>
  );
};

export default CustomNavbar;
