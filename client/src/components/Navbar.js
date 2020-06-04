import React, { useContext, useEffect } from 'react';
import { Popover, Menu, MenuItem, Position, Button, Navbar, AnchorButton, Alignment } from '@blueprintjs/core';
import { UserContext } from '../context/UserContext';
import Axios from 'axios';

export default () => {
  const { user, setUser } = useContext(UserContext);

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
          <MenuItem href={`/profile/${user}`} icon="user" text="Profile" />
          <MenuItem href="/settings" icon="cog" text="Settings" />
          <MenuItem icon="log-out" text="Logout"
            onClick={
              async (e) => {
                e.preventDefault();
                await Axios.post('/auth/logout');
                setUser(null);
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

  useEffect(() => {
    Axios.get('/api/user_data')
      .then(res => {
        console.log(res.data)
        setUser(res.data.username);
      })
      .catch(err => {
        console.error(err);
      });
  }, [])

  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Amazon#</Navbar.Heading>
        <Navbar.Divider />
        <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
        <AnchorButton className="bp3-minimal" icon="grid-view" text="Explore" href="/explore" />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {
          user
            ? menu
            : <div>{loginButton}{registerButton}</div>
        }
      </Navbar.Group>
    </Navbar >
  );
};
