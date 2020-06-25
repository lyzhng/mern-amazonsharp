import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  console.log('Rest', rest);
  console.log('User', user);
  return (
    <Route {...rest} render={(props) => (
      user
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  )
}

export default PrivateRoute;
